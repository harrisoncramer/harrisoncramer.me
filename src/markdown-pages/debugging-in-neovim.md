---
title: Debugging in Neovim
date: 2022-12-21
path: /debugging-in-neovim/
description: Don't context switch by debugging applications directly within Neovim with nvim-dap , a powerful Neovim client for the Debug Adapter Protocol, or DAP.
imageDescription: Debugging client in Neovim.
featuredImage: ../images/posts/bug.png
tags: ["neovim", "debugging"]
---

You'll probably spend more time debugging your next application than physically typing out the code required to run it.

It's always struck me as odd, then, that so many engineers in the Vim community are completely focused on optimizations for text manipulation. Text editing is important, of course, since editing at the speed of thought has benefits beyond just saving you a few keystrokes. But until relatively recently, the premier tool in text manipulation was woefully behind IDEs in terms of the tooling required to debug software.

That's no longer the case, thanks to the <a href="https://microsoft.github.io/debug-adapter-protocol/specification">Debug Adapter Protocol (DAP)</a> and the <a href="https://github.com/mfussenegger/nvim-dap">nvim-dap</a> plugin that turns Neovim into a debugger client. These technologies let Neovim communicate with debuggers that implement the protocol.

This post is meant to serve as a basic guide for setting up a debugger in Neovim. Although this setup applies specifically to Golang, the principles are the same for setting up debuggers for other languages, so long as those debuggers implement the DAP protocol.

## What is DAP?

The Debug Adapter Protocol, or DAP, is a set of rules for how a debugger communicates with a client (usually an editor). Microsoft's <a href="https://microsoft.github.io/debug-adapter-protocol/">summary</a> of the idea puts it well:

<p style="margin-left: 30px;">"The idea behind the Debug Adapter Protocol (DAP) is to abstract the way how the debugging support of development tools communicates with debuggers or runtimes into a protocol. Since it is unrealistic to assume that existing debuggers or runtimes adopt this protocol any time soon, we rather assume that an intermediary component - a so called Debug Adapter - adapts an existing debugger or runtime to the Debug Adapter Protocol.

<p style="margin-left: 30px">The Debug Adapter Protocol makes it possible to implement a generic debugger for a development tool that can communicate with different debuggers via Debug Adapters. And Debug Adapters can be re-used across multiple development tools which significantly reduces the effort to support a new debugger in different tools."</p>

Translating this to a specific language like Golang, we need the following pieces:

1. The editor (Neovim)
2. The DAP "client" which is the `nvim-dap` plugin
3. The debugger which is `delve`
4. The program to run (the Golang code)

This diagram from nvim-dap's documentation is helpful:


```
DAP-Client ----- Debug Adapter ------- Debugger ------ Debugee
(nvim-dap)  ^   (per language)  ^   (per language)    (your app)
            |                   | 
            |                   |
            |        Implementation specific communication
            |        Debug adapter and debugger could be the same process
            |
     Communication via the Debug Adapter Protocol
```

## Installing the Debugger

In order to debug a program you need a debugger. This is the application, completely outside of Neovim, that actually runs and attaches to the running program you are trying to debug.

The program that I'm going to "debug" is a simple TCP server implemented in Golang. You can get the same source code <a href="https://github.com/harrisoncramer/go-connect-tcp.git">here</a> or you can use your own program.

To debug the application, I'm going to use the <a href="https://github.com/go-delve/delve">Delve</a> debugger. You can compile and run the TCP server by navigating to the root directory of this folder and running `go run .` which will compile and run the code. The equivalent command with Delve is `dlv debug .` which compiles the program with the correct debugger flags, and then attaches to it. You can then step through the code in a REPL-like environment.

You can install the Delve and other debuggers outside of Neovim. I prefer to keep my debugger installations baked into my Neovim configuration with <a href="https://github.com/williamboman/mason.nvim">Mason</a>, and optionally, <a href="https://github.com/jay-babu/mason-nvim-dap.nvim">mason-nvim-dap</a>.

After adding Mason to your Neovim configuration, you can use it to install and manage LSPs, DAPs, Linters, and other tools. To install Delve, open up Mason's UI with the `:Mason` command, and navigate to the DAP page:

![Mason](../images/inline_images/mason-dap.png "")

Install the delve debugger by pressing the `i` key to install it. Once the debugger is installed, you should be able to see the binary in Mason's standard binary path at `~/.local/share/nvim/mason/bin`. In a terminal window, run the following command to prove it's been installed:

```bash
$  ~/.local/share/nvim/mason/bin/dlv version
Delve Debugger
Version: 1.20.1
Build: $Id: 96e65b6c615845d42e0e31d903f6475b0e4ece6e
```

Great! We know now that `delve` is installed on our machine.

> This next part is optional. Skip it if you'd like.

This is all fine and good, but we can actually use another plugin _for mason_ to specify the debuggers we want installed automatically, called <a href="https://github.com/jay-babu/mason-nvim-dap.nvim">mason-nvim-dap</a>. Install this and add the following line to your Neovim configuration file:

```lua
require("mason-nvim-dap").setup({
    ensure_installed = { "delve" }
})
```

Next, uninstall the delve debugger through Mason's UI (the same way you installed it, but by pressing `X` when hovering over it). Close and reopen Neovim, and you should see that the debugger is automatically installed for you in the same path. Check the messages with `:messages` and you should see the following:

```
[mason-nvim-dap] installing delve
[mason-nvim-dap] delve was installed
```

This is great, because it allows us to specify the automatic installation of debuggers directly within our Neovim configuration. Not all debuggers available by Mason are included in this extra extension, so just be aware of that.

## Installing Nvim-DAP

Next, we need to install <a href="https://github.com/mfussenegger/nvim-dap">nvim-dap</a>, the plugin that will actually allow Neovim to communicate with Delve.

Let's see nvim-dap "breaking" before we understand how to get it working. Install nvim-dap, and open up the `main.go` file in your project and run the following ex command: `:lua require("dap").continue()`

You should see the following message:

```
No configuration found for `go`. You need to add configs to `dap.configurations.go` (See `:h dap-configuration`)
```

What's going on here? We've installed the debugger, and the debugger adapter for Neovim, but we haven't told nvim-dap what do to for Golang files yet. As the documentation states: "Neovim needs to instruct the debug adapter .. how to launch and connect to the debugee. The debugee is the application you want to debug."

Add the following to your configuration:

```lua
local dap_ok, dap = pcall(require, "dap")
if not (dap_ok) then
  print("nvim-dap not installed!")
  return
end

require('dap').set_log_level('INFO') -- Helps with configuring DAP

dap.configurations = {
    go = {
      {
        type = "go", -- Which adapter to use
        name = "Debug", -- Human readable name
        request = "launch", -- Whether to "launch" or "attach" to program
        program = "${file}", -- The buffer you are focused on when running nvim-dap
      },
    }
}
```

Now, run the same command. You should see a different error message:

```
The selected configuration references adapter `go`, but dap.adapters.go is undefined
```

We now need to specify a debug adapter that will run for this configuration. Add this to your configuration:

```lua
dap.adapters.go = {
  type = "server",
  port = "${port}",
  executable = {
    command = "dlv",
    args = { "dap", "-l", "127.0.0.1:${port}" },
  },
}
```

We should finally be set up and ready to run the debugger for real. Hover over a line in the `main.go` file and set a breakpoint with `:lua require("dap").toggle_breakpoint()` then re-run the above command to start the debugger.

After a moment, you should see the debugger pause on the line you set. You shouldn't see any errors, and if you grep for a running delve process, you should see it:

```
$ top | grep dlv
96326  dlv              0.0  00:00.09 16     0   37     17M    0B    0B    96326 96166 sleeping *0[1]      0.00000 0.00000    501 2160     443   40        15        6086       112       2575       0       11       0.0   0         0         harrisoncramer         N/A    N/A   N/A   N/A   N/A   N/A
96326  dlv              0.0  00:00.09 16     0   37     17M    0B    0B    96326 96166 sleeping *0[1]      0.00000 0.00000    501 2160     443   40        15        6086       112       2575       0       11       0.0   0         0         harrisoncramer         N/A    N/A   N/A   N/A   N/A   N/A
96326  dlv              0.0  00:00.09 16     0   37     17M    0B    0B    96326 96166 sleeping *0[1]      0.00000 0.00000    501 2160     443   40        15        6086       112       2575       0       11       0.0   0         0         harrisoncramer         N/A    N/A   N/A   N/A   N/A   N/A
96326  dlv              0.0  00:00.09 16     0   37     17M    0B    0B    96326 96166 sleeping *0[1]      0.00000 0.00000    501 2160     443   40        15        6102+      112       2585+      0       12+      0.0   146088    455607    harrisoncramer         N/A    N/A   N/A   N/A   N/A   N/A
96326  dlv              0.0  00:00.09 16     0   37     17M    0B    0B    96326 96166 sleeping *0[1]      0.00000 0.00000    501 2160     443   40        15        6102       112       2585       0       12       0.0   0         0         harrisoncramer         N/A    N/A   N/A   N/A   N/A   N/A
```

Nice! This shows that we've successfully set up delve to launch via Neovim. Finally, close and terminate the debugger with `:lua require("dap").terminate()` which will close the delve process and terminate the connection.

## Configuring Dap-UI

The default experience with DAP is pretty rough without a better UI and keybindings to start and stop the debugger, set breakpoints in the code, and so forth. Luckily, this is very easy to configure with <a href=" https://github.com/rcarriga/nvim-dap-ui">nvim-dap-ui</a>. This is the configuration that I like.

```lua
local dap_ui_ok, ui = pcall(require, "dapui")
if not (dap_ok and dap_ui_ok) then
  require("notify")("dap-ui not installed!", "warning")
  return
end

ui.setup({
  icons = { expanded = "▾", collapsed = "▸" },
  mappings = {
    open = "o",
    remove = "d",
    edit = "e",
    repl = "r",
    toggle = "t",
  },
  expand_lines = vim.fn.has("nvim-0.7"),
  layouts = {
    {
      elements = {
        "scopes",
      },
      size = 0.3,
      position = "right"
    },
    {
      elements = {
        "repl",
        "breakpoints"
      },
      size = 0.3,
      position = "bottom",
    },
  },
  floating = {
    max_height = nil,
    max_width = nil,
    border = "single",
    mappings = {
      close = { "q", "<Esc>" },
    },
  },
  windows = { indent = 1 },
  render = {
    max_type_length = nil,
  },
})
```

I also have the following keybindings set up to call functions in both plugins:

```lua
local dap_ok, dap = pcall(require, "dap")
local dap_ui_ok, ui = pcall(require, "dapui")

if not (dap_ok and dap_ui_ok) then
  require("notify")("nvim-dap or dap-ui not installed!", "warning") -- nvim-notify is a separate plugin, I recommend it too!
  return
end

vim.fn.sign_define('DapBreakpoint', { text = '🐞' })

-- Start debugging session
vim.keymap.set("n", "<localleader>ds", function()
  dap.continue()
  ui.toggle({})
  vim.api.nvim_feedkeys(vim.api.nvim_replace_termcodes("<C-w>=", false, true, true), "n", false) -- Spaces buffers evenly
end)

-- Set breakpoints, get variable values, step into/out of functions, etc.
vim.keymap.set("n", "<localleader>dl", require("dap.ui.widgets").hover)
vim.keymap.set("n", "<localleader>dc", dap.continue)
vim.keymap.set("n", "<localleader>db", dap.toggle_breakpoint)
vim.keymap.set("n", "<localleader>dn", dap.step_over)
vim.keymap.set("n", "<localleader>di", dap.step_into)
vim.keymap.set("n", "<localleader>do", dap.step_out)
vim.keymap.set("n", "<localleader>dC", function()
  dap.clear_breakpoints()
  require("notify")("Breakpoints cleared", "warn")
end)

-- Close debugger and clear breakpoints
vim.keymap.set("n", "<localleader>de", function()
  dap.clear_breakpoints()
  ui.toggle({})
  dap.terminate()
  vim.api.nvim_feedkeys(vim.api.nvim_replace_termcodes("<C-w>=", false, true, true), "n", false)
  require("notify")("Debugger session ended", "warn")
end)
```


We now have a nice interface that lets us step through the code, view breakpoints, and so forth. Here's what the full setup looks like on my machine:

![Nvim-DAP](../images/inline_images/nvim-dap-ui-go.png "")

## Multiple Configurations

This works fine if you want to run the equivalent of `dlv debug .` locally. But what if you want to have multiple different debug configurations for different scenarios? You can simply add another table to your `dap.configurations.go` table! I've got separate configurations for:

1. Compiling and running the program with delve right away (what we just configured)
2. Debugging a test file
3. Attaching to a running debugger by picking it's PID
4. Attaching to an already running debugger running on a specific port

They look like this, and nvim-dap will ask me which of the configurations I'd like to use when I open it on a Golang file:

```lua
local go = {
  {
    type = "go",
    name = "Debug",
    request = "launch",
    program = "${file}",
  },
  {
    type = "go",
    name = "Debug test (go.mod)",
    request = "launch",
    mode = "test",
    program = "./${relativeFileDirname}",
  },
  {
    type = "go",
    name = "Attach (Pick Process)",
    mode = "local",
    request = "attach",
    processId = require('dap.utils').pick_process,
  },
  {
    type = "go",
    name = "Attach (127.0.0.1:9080)",
    mode = "remote",
    request = "attach",
    port = "9080"
  },
}
```

## Next Steps

We've now walked through the installation of the debugger, the debugger adapter, configuring the debugger, and adding a UI layer.

If something goes wrong during your own setup, check Neovim's messages, and also DAP's logs with `:DapShowLog`.

It's worth mentioning that you can achieve configuration of the debug adapter for Go specifically with <a href="https://github.com/leoluz/nvim-dap-go">nvim-dap-go</a>, which will effectively write the `dap.configurations.go` and `dap.adapters.go` sections of your DAP configuration for you. You'll still need to install the debugger (delve) in order to use it, and the UI. If you prefer a more out-of-the-box configuration for Golang specifically, this plugin is quite nice.

Finally, you can find my personal dotfiles <a href="github.com/harrisoncramer/nvim">here</a> and specifically my debugger configuration <a href="https://github.com/harrisoncramer/nvim/tree/main/lua/plugins/dap">here</a>.


