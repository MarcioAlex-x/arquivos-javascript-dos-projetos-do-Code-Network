document.addEventListener("DOMContentLoaded", () => {
  const url = "https://api.github.com/users/";
  const input = document.querySelector("input");
  const button = document.querySelector("button");
  const img = document.querySelector("img");
  const h2 = document.querySelector("h2");
  const p = document.querySelector("p");
  const contentProfile = document.querySelector(".contentProfile");
  const repositories = document.querySelector(".repositories");
  const divProfile = document.querySelector('.profile')

  divProfile.classList.add('hidden')//Mostrar quando a classe é aplicada na aula de CSS

  const loader = document.createElement("p");
  loader.textContent = "Carregando...";
  loader.style.display = "none";
  document.body.append(loader);

  const getUser = async (e) => {
    e.preventDefault();
    
    divProfile.classList.remove('hidden')//Momento Quando a classe é removida

    //   input.value = ""
    img.src = "";
    h2.textContent = "";
    p.textContent = "";
    contentProfile.textContent = "";
    repositories.innerHTML = "";
    loader.style.display = "block";

    try {
      const user = await fetch(url + input.value.trim());
      if (!user.ok) throw new Error("Usuário não encontrado");

      const userJson = await user.json();
      img.src = userJson.avatar_url;
      h2.textContent = userJson.name || "Usuário sem nome";
      h2.textContent = userJson.login || "";
      contentProfile.textContent =
        userJson.bio || "Nenhuma biografia disponível.";

      const repos = await fetch(userJson.repos_url);
      const reposJson = await repos.json();

      if (reposJson.length === 0) {
        const noRepos = document.createElement("li");
        noRepos.textContent = "Nenhum repositório disponível.";
        repositories.append(noRepos);
      } else {
        const h3 = document.createElement("h3");
        const hr = document.createElement("hr");
        h3.textContent = "Repositórios";
        repositories.appendChild(h3);
        reposJson.forEach((repo) => {
          const li = document.createElement("li");
          li.textContent = `
          Nome:${repo.name} | 
          Tipo:${repo.owner.user_view_type === 'public' ? 'Público' : 'Privado'} | 
          Visibilidade: ${repo.visibility === 'public' ? 'Público' : 'Privado'}
          `;
          li.classList.add('repoList')
          repositories.appendChild(li);
          input.value = "";
        });
      }
    } catch (error) {
      h2.textContent = "Erro";
      contentProfile.textContent =
        error.message === "Usuário não encontrado"
          ? "Usuário não encontrado. Tente novamente."
          : "Erro ao buscar dados. Verifique sua conexão.";
    } finally {
      loader.style.display = "none";
    }
  };

  button.addEventListener("click", getUser);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") getUser(e);
  });

  input.placeholder = "Digite o nome de usuário do GitHub...";
});
