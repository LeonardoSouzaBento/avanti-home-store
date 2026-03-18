export function initSearch() {
  const searchWrapper = document.querySelector(".header-search");
  const searchInput = searchWrapper.querySelector("input");
  const searchButton = searchWrapper.querySelector(".search-button");
  const searchResults = document.querySelector("#search-results");
  const searchResultsUl = searchResults.querySelector("ul");

  // Limpar itens iniciais se houver
  searchResultsUl.innerHTML = "";

  const updateResultsVisibility = () => {
    const hasItems = searchResultsUl.children.length > 0;
    const isFocused = document.activeElement === searchInput;

    if (hasItems && isFocused) {
      searchResults.style.display = "block";
    } else {
      searchResults.style.display = "none";
    }
  };

  searchButton.addEventListener("click", () => {
    const value = searchInput.value.trim();
    if (value === "") return;

    const isDuplicate = Array.from(searchResultsUl.children).some(
      (li) => li.textContent.toLowerCase() === value.toLowerCase()
    );

    if (isDuplicate) {
      searchInput.value = "";
      return;
    }

    const li = document.createElement("li");
    li.textContent = value;

    if (searchResultsUl.children.length >= 6) {
      searchResultsUl.removeChild(searchResultsUl.lastElementChild);
    }

    searchResultsUl.insertBefore(li, searchResultsUl.firstChild);
    searchInput.value = "";
    updateResultsVisibility();
  });

  searchInput.addEventListener("focus", updateResultsVisibility);
  searchInput.addEventListener("blur", () => {
    setTimeout(updateResultsVisibility, 200);
  });

  // Preencher input ao clicar nas sugestões
  searchResultsUl.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (li) {
      searchInput.value = li.textContent;
    }
  });

  // Impedir que o clique no box de resultados esconda ele mesmo (previne o blur do input)
  searchResults.addEventListener("mousedown", (e) => {
    e.preventDefault();
  });

  document.addEventListener("click", (e) => {
    if (!searchWrapper.contains(e.target)) {
      searchResults.style.display = "none";
    }
  });

  // Também permitir pesquisar com Enter
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchButton.click();
    }
  });
}