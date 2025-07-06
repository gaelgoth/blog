<script lang="ts">
  export let project: {
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

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Language colors (common ones)
  const languageColors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    'C#': '#239120',
    'C++': '#f34b7d',
    C: '#555555',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    Swift: '#ffac45',
    Kotlin: '#A97BFF',
    Scala: '#c22d40',
    HTML: '#e34c26',
    CSS: '#1572B6',
    Vue: '#4FC08D',
    Svelte: '#ff3e00',
    React: '#61DAFB',
    Angular: '#dd0031',
    Shell: '#89e051',
    Dockerfile: '#384d54',
    Nix: '#7e7eff'
  }

  $: languageColor = project.language ? languageColors[project.language] || '#6b7280' : '#6b7280'
</script>

<div class="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
  <div class="card-body p-6">
    <!-- Header with title and status -->
    <div class="flex items-start justify-between mb-3">
      <h3 class="card-title text-lg flex-1 leading-tight">
        <a 
          href={project.html_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          class="hover:underline break-words"
        >
          {project.name}
        </a>
      </h3>
      {#if project.archived}
        <span class="badge badge-warning badge-sm ml-2 flex-shrink-0">
          Archived
        </span>
      {/if}
    </div>

    <!-- Description -->
    <p class="text-sm opacity-70 mb-4 flex-1">
      {project.description || 'No description available'}
    </p>

    <!-- Topics -->
    {#if project.topics && project.topics.length > 0}
      <div class="flex flex-wrap gap-1 mb-4">
        {#each project.topics.slice(0, 3) as topic}
          <span class="badge badge-outline badge-sm">{topic}</span>
        {/each}
        {#if project.topics.length > 3}
          <span class="badge badge-outline badge-sm">+{project.topics.length - 3}</span>
        {/if}
      </div>
    {/if}

    <!-- Stats -->
    <div class="flex items-center gap-4 mb-4 text-sm">
      {#if project.stargazers_count > 0}
        <div class="flex items-center gap-1">
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            version="1.1"
            class="w-4 h-4 fill-current opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
            />
          </svg>
          <span class="opacity-70">{project.stargazers_count}</span>
        </div>
      {/if}
      
      {#if project.forks_count > 0}
        <div class="flex items-center gap-1">
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            version="1.1"
            class="w-4 h-4 fill-current opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
            />
          </svg>
          <span class="opacity-70">{project.forks_count}</span>
        </div>
      {/if}
    </div>

    <!-- Language and last updated -->
    <div class="flex items-center justify-between text-xs opacity-70 mb-4">
      {#if project.language}
        <div class="flex items-center gap-2">
          <div 
            class="w-3 h-3 rounded-full"
            style="background-color: {languageColor}"
          ></div>
          <span>{project.language}</span>
        </div>
      {/if}
      <span>Updated {formatDate(project.updated_at)}</span>
    </div>

    <!-- Actions -->
    <div class="card-actions justify-between items-center mt-auto">
      <div class="flex gap-2">
        <a
          href={project.html_url}
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-primary btn-sm"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            version="1.1"
            class="w-4 h-4 fill-current mr-1"
          >
            <path
              fill-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            />
          </svg>
          Code
        </a>
        
        {#if project.homepage}
          <a
            href={project.homepage}
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-outline btn-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 mr-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
            Demo
          </a>
        {/if}
      </div>
      
      {#if project.license}
        <span class="text-xs opacity-50">{project.license.key}</span>
      {/if}
    </div>
  </div>
</div>
