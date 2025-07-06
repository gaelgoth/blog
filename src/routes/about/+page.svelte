<script lang="ts">
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  import { title as storedTitle } from '$lib/stores/title'
  import Head from '$lib/components/head.svelte'
  import Footer from '$lib/components/footer.svelte'
  import ProjectCard from '$lib/components/project_card.svelte'

  storedTitle.set('About')

  interface GitHubRepo {
    id: number
    name: string
    full_name: string
    description: string
    html_url: string
    homepage?: string
    archived: boolean
    language: string
    stargazers_count: number
    forks_count: number
    owner: {
      login: string
      avatar_url: string
    }
    license?: {
      key: string
      name: string
    }
    created_at: string
    updated_at: string
    pushed_at: string
    topics: string[]
  }

  let projects: GitHubRepo[] = []
  let loading = true
  let error: string | null = null

  // GitHub username
  const username = 'gaelgoth'

  // Manually curated GitHub projects with pinning
  const curatedProjects = [
    {
      repo: 'gaelgoth/nix-homelab',
      pinned: true
    },
    {
      repo: 'gaelgoth/vaporflow-startpage',
      pinned: false
    },
    {
      repo: 'gaelgoth/nuance',
      pinned: true
    }
  ]

  // Additional manual projects (non-GitHub)
  const manualProjects = [
    {
      name: 'Photography Portfolio',
      description: 'Personal photography portfolio showcasing my work and visual storytelling',
      homepage: 'https://photo.gothuey.dev/',
      language: 'Web',
      topics: ['photography', 'portfolio', 'visual-arts'],
      pinned: true
    }
  ]

  onMount(async () => {
    try {
      // Fetch only the specified repositories
      const repoPromises = curatedProjects.map(async ({ repo }) => {
        const response = await fetch(`https://api.github.com/repos/${repo}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch ${repo}: ${response.status}`)
        }
        return await response.json()
      })

      const repos: GitHubRepo[] = await Promise.all(repoPromises)

      // Sort projects: pinned first, then by stars, then by update date
      projects = repos.sort((a, b) => {
        const aConfig = curatedProjects.find(p => p.repo.endsWith(a.name))
        const bConfig = curatedProjects.find(p => p.repo.endsWith(b.name))

        const aPinned = aConfig?.pinned || false
        const bPinned = bConfig?.pinned || false

        if (aPinned && !bPinned) return -1
        if (!aPinned && bPinned) return 1

        // Then by stars
        if (a.stargazers_count !== b.stargazers_count) {
          return b.stargazers_count - a.stargazers_count
        }

        // Finally by update date
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      })
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load projects'
      console.error('Error fetching GitHub repos:', err)
    } finally {
      loading = false
    }
  })
</script>

<Head />

<div class="flex flex-col flex-nowrap justify-center xl:flex-row xl:flex-wrap">
  <div
    in:fly={{ x: 25, duration: 300, delay: 500 }}
    out:fly={{ x: 25, duration: 300 }}
    class="flex-1 w-full max-w-screen-lg mx-auto px-4">
    <!-- About Me Section -->
    <section class="mb-8">
      <article class="prose prose-lg max-w-none">
        <h1 class="text-4xl font-bold mb-6">About Me</h1>

        <div class="grid md:grid-cols-3 gap-8 mb-8">
          <div class="md:col-span-2">
            <h2 class="text-2xl font-semibold mb-4">Hello, I'm Gaël 👋🏽</h2>
            <p class="text-lg leading-relaxed mb-4">
              I'm a DevOps Engineer based in Lausanne, Switzerland, passionate about building reliable, scalable infrastructure
              and sharing knowledge through this blog. When I'm not tinkering with containers or writing Infrastructure as Code,
              you'll find me exploring the beautiful Swiss landscapes with my camera.
            </p>

            <h3 class="text-xl font-semibold mb-3">What I Do</h3>
            <p class="mb-4">
              I specialize in cloud-native technologies, automation, and DevOps practices. My work revolves around making
              software delivery faster, more reliable, and more enjoyable for development teams. I'm particularly interested in:
            </p>

            <ul class="list-disc list-inside mb-6 space-y-2">
              <li>
                <strong>Infrastructure as Code</strong>
                - Terraform, Ansible, NixOS
              </li>
              <li>
                <strong>Container Orchestration</strong>
                - Docker, Kubernetes, Docker Swarm
              </li>
              <li>
                <strong>CI/CD Pipelines</strong>
                - GitLab CI, GitHub Actions, Jenkins
              </li>
              <li>
                <strong>Cloud Platforms</strong>
                - AWS, Google Cloud, Digital Ocean
              </li>
              <li>
                <strong>Monitoring & Observability</strong>
                - Prometheus, Grafana, ELK Stack
              </li>
            </ul>

            <h3 class="text-xl font-semibold mb-3">Beyond Tech</h3>
            <p class="mb-4">
              Outside of the tech world, I'm a photography enthusiast who loves capturing moments and telling stories through
              images. I'm also a huge fan of old school Hip-Hop, the Los Angeles Lakers, and Formula 1 racing. On Sundays,
              you'll likely find me watching the Grand Prix or exploring new hiking trails in the Alps.
            </p>

            <h3 class="text-xl font-semibold mb-3">This Blog</h3>
            <p>
              This space serves as my digital notebook where I share insights, tutorials, and experiences from my journey in
              DevOps and technology. Whether it's a deep dive into a new tool, lessons learned from a project, or thoughts on
              industry trends, I hope you find something valuable here.
            </p>
          </div>

          <div class="md:col-span-1">
            <!-- Work Experience Section -->
            <div class="card bg-base-200 shadow-lg mb-6">
              <div class="card-body">
                <h3 class="card-title text-lg mb-4">Work Experience</h3>
                <div class="space-y-4">
                  <div class="border-l-4 border-primary pl-4">
                    <h4 class="font-semibold text-base">DevOps Engineer</h4>
                    <p class="text-sm opacity-70">Current Company</p>
                    <p class="text-xs opacity-60">2023 - Present</p>
                  </div>
                  <div class="border-l-4 border-primary pl-4">
                    <h4 class="font-semibold text-base">Senior Systems Administrator</h4>
                    <p class="text-sm opacity-70">Previous Company</p>
                    <p class="text-xs opacity-60">2020 - 2023</p>
                  </div>
                  <div class="border-l-4 border-primary pl-4">
                    <h4 class="font-semibold text-base">Systems Administrator</h4>
                    <p class="text-sm opacity-70">Earlier Company</p>
                    <p class="text-xs opacity-60">2018 - 2020</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Certifications Section -->
            <div class="card bg-base-200 shadow-lg mb-6">
              <div class="card-body">
                <h3 class="card-title text-lg mb-4">Certifications</h3>
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <span class="text-lg">�</span>
                    <div>
                      <p class="font-medium text-sm">AWS Certified Solutions Architect</p>
                      <p class="text-xs opacity-60">Amazon Web Services</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-lg">�</span>
                    <div>
                      <p class="font-medium text-sm">Certified Kubernetes Administrator</p>
                      <p class="text-xs opacity-60">Cloud Native Computing Foundation</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-lg">�</span>
                    <div>
                      <p class="font-medium text-sm">HashiCorp Certified: Terraform Associate</p>
                      <p class="text-xs opacity-60">HashiCorp</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Connect With Me Section -->
            <div class="card bg-base-200 shadow-lg">
              <div class="card-body">
                <h3 class="card-title text-lg mb-4">Connect With Me</h3>
                <div class="flex flex-wrap gap-2">
                  <a
                    href="https://github.com/gaelgoth"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-sm btn-outline">
                    <span class="i-simple-icons-github mr-1"></span>
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/gael-gothuey"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-sm btn-outline">
                    <span class="i-simple-icons-linkedin mr-1"></span>
                    LinkedIn
                  </a>
                  <a href="https://photo.gothuey.dev/" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">
                    <span class="i-simple-icons-photon mr-1"></span>
                    Photography
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>

    <!-- Projects Section -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold mb-6">Featured Projects</h2>
      <p class="text-lg opacity-70 mb-8">
        Here are some projects I've worked on that I'm particularly proud of. From DevOps tools to personal experiments, each
        represents a different aspect of my interests and expertise.
      </p>

      {#if loading}
        <div class="flex justify-center items-center py-12">
          <div class="loading loading-spinner loading-lg"></div>
        </div>
      {:else if error}
        <div class="alert alert-error shadow-lg mb-8">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Error loading projects: {error}</span>
          </div>
        </div>
      {:else}
        <!-- Pinned Projects -->
        {#if manualProjects.filter(p => p.pinned).length > 0 || projects.filter((p, i) => curatedProjects[i]?.pinned).length > 0}
          <section class="mb-12">
            <h3 class="text-xl font-semibold mb-6">
              Featured Projects
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Pinned Manual Projects -->
              {#each manualProjects.filter(p => p.pinned) as project}
                <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div class="card-body">
                    <h4 class="card-title text-lg">
                      <a href={project.homepage} target="_blank" rel="noopener noreferrer" class="hover:underline">
                        {project.name}
                      </a>
                    </h4>
                    <p class="text-sm opacity-70 mb-4">{project.description}</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                      {#each project.topics as topic}
                        <span class="badge badge-outline badge-sm">{topic}</span>
                      {/each}
                    </div>
                    <div class="card-actions justify-between items-center">
                      <span class="text-sm font-medium">{project.language}</span>
                      <a href={project.homepage} target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                        View Project
                      </a>
                    </div>
                  </div>
                </div>
              {/each}

              <!-- Pinned GitHub Projects -->
              {#each projects.filter((p, i) => curatedProjects.find(c => c.repo.endsWith(p.name))?.pinned) as project}
                <ProjectCard {project} />
              {/each}
            </div>
          </section>
        {/if}

        <!-- Other Projects -->
        {#if manualProjects.filter(p => !p.pinned).length > 0 || projects.filter((p, i) => !curatedProjects.find( c => c.repo.endsWith(p.name) )?.pinned).length > 0}
          <section>
            <h3 class="text-xl font-semibold mb-6">Other Projects</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Non-pinned Manual Projects -->
              {#each manualProjects.filter(p => !p.pinned) as project}
                <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div class="card-body">
                    <h4 class="card-title text-lg">
                      <a href={project.homepage} target="_blank" rel="noopener noreferrer" class="hover:underline">
                        {project.name}
                      </a>
                    </h4>
                    <p class="text-sm opacity-70 mb-4">{project.description}</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                      {#each project.topics as topic}
                        <span class="badge badge-outline badge-sm">{topic}</span>
                      {/each}
                    </div>
                    <div class="card-actions justify-between items-center">
                      <span class="text-sm font-medium">{project.language}</span>
                      <a href={project.homepage} target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                        View Project
                      </a>
                    </div>
                  </div>
                </div>
              {/each}

              <!-- Non-pinned GitHub Projects -->
              {#each projects.filter((p, i) => !curatedProjects.find(c => c.repo.endsWith(p.name))?.pinned) as project}
                <ProjectCard {project} />
              {/each}
            </div>
          </section>
        {/if}

        {#if projects.length === 0 && manualProjects.length === 0}
          <div class="alert alert-info shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="stroke-current flex-shrink-0 w-6 h-6">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                </path>
              </svg>
              <span>No projects configured.</span>
            </div>
          </div>
        {/if}
      {/if}
    </section>
  </div>
</div>

<Footer />
