---
title: Atlantis
subtitle: Thesis project
order: 10
video: /video/atlantis.mp4
poster: /img/atlantis.png
links:
  - label: YouTube video
    url: https://www.youtube.com/watch?v=t9oxAQDfv6c
---
When I played **Abzû** a few years ago I was amazed by how well it looked and ran on my pretty old PC. So, for this
project, I decided to explore optimization techniques that make it possible to simulate and display large numbers of
objects in real-time.

I've implemented a movement algorithm using Data-Oriented Design principles and compute shaders. Fish are rendered in
an optimal way using GPU Instancing and persistent transform data in GPU buffers that are updated directly in compute
shaders. There is also asynchronous data synchronization, so I could query physics on the CPU and send back the
results to GPU without blocking game execution. I've implemented animation in vertex shader that takes into account
the acceleration and rotation changes of every fish. I've also done some visual effects like sand, caustics, or light
shafts to help convey the underwater vibe.

I tried to include as many elements as possible because I know that it's easy to make conclusions from prototypes
where only the bare minimum is present. But the biggest challenges often arise when you're trying to put a prototype
into context.

I wanted to release the full project publicly, but in the end, I used some assets from Unity Asset Store, so I
couldn't. Instead, I've put some of its [code on GitHub](https://github.com/miknios/eseas-code).
