---
title: My First Post has a very long title
date: 2019-07-10
path: /my-first-post
description: This is my first blog post. It's a rather lengthy description.
imageDescription: View of some code on a monitor.
featuredImage: ../images/posts/my-first-post.png
tags: ["General"]
---

## Hello!

This is some good content.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id nunc ante. Maecenas in nisi mauris. Duis ac finibus lorem, in consectetur diam. Mauris eu facilisis orci. Integer scelerisque augue massa, at commodo sem aliquam eget. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse potenti. Fusce non erat ac velit faucibus blandit. Nam nisi urna, ullamcorper in metus id, aliquet varius odio. Donec consectetur ante in mattis eleifend. Nulla facilisi. Suspendisse placerat risus lorem, non maximus magna dignissim ut. Nullam malesuada quam at lobortis facilisis.

Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla tristique a lacus in volutpat. Nulla facilisi. Suspendisse auctor semper risus sed pulvinar. Donec pharetra gravida fermentum. Integer luctus arcu lorem, a lobortis purus dapibus eget. Nunc aliquam quis mauris facilisis gravida. Duis ut magna metus. Pellentesque enim sem, mattis vitae ex eget, interdum gravida mauris. Sed consectetur nulla mauris, ac malesuada nunc vestibulum quis. Mauris consequat, nisi vel fermentum facilisis, nisl lacus ultricies velit, at cursus lectus tortor eu nulla. Vivamus enim sapien, aliquam eget cursus in, pellentesque in erat. Sed at facilisis libero.

<deckgo-highlight-code terminal="none">
  <code slot="code">
var a, b, c;
a = 5;
b = 6;
c = a + b;
document.getElementById('demo1').innerHTML = c;
  </code>
</deckgo-highlight-code>

Donec ullamcorper felis dui, eu rhoncus ligula vulputate nec. Morbi iaculis velit sed vulputate ultrices. Integer arcu sapien, tincidunt nec sodales eu, sollicitudin vel nulla. Donec fermentum, justo a volutpat laoreet, felis turpis gravida mauris, nec pretium sapien ante sed ligula. Cras dapibus tempor est in suscipit. Donec a auctor justo, ac placerat orci. Donec rhoncus, quam eu accumsan pulvinar, urna eros tincidunt purus, id egestas lectus velit ut lectus. Duis ac ligula nibh. Praesent tincidunt mollis nisl, ac varius leo pretium id.

Nam eu est non lacus tempor ultricies. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam nec ligula efficitur, laoreet justo in, convallis leo. Aliquam diam augue, pellentesque nec lectus id, efficitur sodales nunc. In mauris sapien, fringilla vitae feugiat non, sagittis non justo. Etiam lectus nunc, dapibus id scelerisque eu, tempor quis sem. In aliquam ipsum vitae finibus pulvinar. Donec bibendum lorem fringilla dolor bibendum, eget iaculis ligula commodo. In non urna eget nisl venenatis venenatis a eu quam. Ut et orci orci. Aliquam quis tristique ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin magna augue, varius non purus quis, pharetra vestibulum felis. Proin ex lectus, cursus vel convallis nec, tristique id mauris. Vestibulum ut diam leo.

<deckgo-highlight-code terminal="none">
  <code slot="code">
var a, b, c;
a = 5;
b = 6;
c = a + b;
document.getElementById('demo1').innerHTML = c;
  </code>
</deckgo-highlight-code>

<deckgo-highlight-code terminal="none">
  <code slot="code">
title: My title
date:
  - IsGood: Okay
  </code>
</deckgo-highlight-code>

<deckgo-highlight-code terminal="none" language="go">
<code slot="code">
    
    package main
    
    import (
      "fmt"
      "net"
      "net/url"
    )

    func main() {

    s := "postgres://user:pass@host.com:5432/path?k=v#f"

    u, err := url.Parse(s)
    if err != nil {
        panic(err)
    }

    fmt.Println(u.Scheme)

    fmt.Println(u.User)
    fmt.Println(u.User.Username())
    p, _ := u.User.Password()
    fmt.Println(p)

    fmt.Println(u.Host)
    host, port, _ := net.SplitHostPort(u.Host)
    fmt.Println(host)
    fmt.Println(port)

    fmt.Println(u.Path)
    fmt.Println(u.Fragment)

    fmt.Println(u.RawQuery)
    m, _ := url.ParseQuery(u.RawQuery)
    fmt.Println(m)
    fmt.Println(m["k"][0])

}
</code>
</deckgo-highlight-code>
