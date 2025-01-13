addEventListener('DOMContentLoaded',()=>{
    
    const url = 'http://api.github.com/users/MarcioAlex-x'
    const fetchUrl = async () => {
        const res = await fetch(url)
        const data = await res.json()

        const fields = {
            profileImg: document.querySelector('.profileImg'),
            profileName: document.querySelector('.profileName'),
            profileDescription: document.querySelector('.profileDescription'),
            usersFollowers: document.querySelector('.usersFollowers'),
            usersFollowing: document.querySelector('.usersFollowing'),
            reposQtd: document.querySelector('.reposQtd'),
            profileContent: document.querySelector('.profileContent'),
        }
        
        fields.profileImg.src = data.avatar_url
        fields.profileImg.alt = `Imagem de ${data.name}` || data.name
        fields.profileName.textContent = data.name
        fields.profileDescription.textContent = data.bio
        fields.usersFollowers.textContent = `${data.followers} seguidores`	
        fields.usersFollowing.textContent = `Seguindo ${data.following}`
        fields.reposQtd.textContent = `${data.public_repos} repositórios`
        fields.profileContent.href = data.html_url

        
    }

    const fetchRepos = async () => {
        const res = await fetch(url + '/repos')
        const data = await res.json()
        console.log(data)

        const repos = document.querySelector('.repos')
        const updateDate = new Date()

        data.forEach(repo => {
            const repoDiv = document.createElement('div')
            repoDiv.classList.add('repo')
            const updateAt = new Date(repo.updated_at)
            const formattedDate = updateAt.toLocaleDateString('pt-BR',{
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
            const homepageLink = repo.homepage ? `<a href="${repo.homepage} target="_blank">Deploy</a>` : ``

            repoDiv.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description ? repo.description : 'Sem descrição'}</p>
                
                <p><span>Linguagem: ${repo.language} Última atualização: ${formattedDate}</span></p>
                <a href="${repo.html_url} target="_blank">Acesse o repositório</a>
                ${homepageLink}
            `
            repos.appendChild(repoDiv)
        })
    }
    fetchRepos()
    fetchUrl()
})