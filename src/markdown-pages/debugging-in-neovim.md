---
title: Debugging in Neovim
date: 2022-12-21
path: /debugging-in-neovim/
description: Don't context switch by debugging applications directly within Neovim with nvim-dap , a powerful Neovim client for the Debug Adapter Protocol, or DAP.
imageDescription: Debugging client in Neovim.
featuredImage: ../images/posts/bug.png
tags: ["neovim"]
draft: true
---

You'll probably spend more time debugging your next application than physically typing out the code required to run it.

It's always struck me as odd, then, that so many engineers in the Vim community are completely focused on optimizations for text manipulation. Text editing is important, of course, since editing at the speed of thought has benefits beyond just saving you a few keystrokes. But until relatively recently, the premier tool in text manipulation was woefully behind IDEs in terms of the tooling required to debug software.

That's no longer the case, thanks to the <a href="https://microsoft.github.io/debug-adapter-protocol/specification">Debug Adapter Protocol (DAP)</a> and the <a href="https://github.com/mfussenegger/nvim-dap">nvim-dap</a> plugin that turns Neovim into a debugger client. These technologies let Neovim communicate with debuggers that implement the protocol.

This post is meant to serve as a basic guide for setting up a debugger in Neovim. Although this setup applies specifically to Golang, the principles are the same for setting up debuggers for other languages, so long as those debuggers implement the DAP protocol.

## What is DAP?

The Debug Adapter Protocol, or DAP, is a set of rules for how a debugger communicates with a client (usually an editor). Microsoft's <a href="https://microsoft.github.io/debug-adapter-protocol/">summary</a> of the idea puts it well:

<p style="margin-left: 30px;">"The idea behind the Debug Adapter Protocol (DAP) is to abstract the way how the debugging support of development tools communicates with debuggers or runtimes into a protocol. Since it is unrealistic to assume that existing debuggers or runtimes adopt this protocol any time soon, we rather assume that an intermediary component - a so called Debug Adapter - adapts an existing debugger or runtime to the Debug Adapter Protocol."

