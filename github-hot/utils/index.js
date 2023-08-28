function getUrlLanguage() {
    return new URLSearchParams(window.location.search).get('language') || 'All';
}
function getRequestUrl(language='All', page=1) {
    if (language === 'All') {
        return `https://api.github.com/search/repositories?q=stars%3A%3E1&sort=stars&order=desc&type=Repositories&page=${page}&per_page=10`
    }
    return `https://api.github.com/search/repositories?q=stars%3A%3E1%20language%3A${language}&sort=stars&order=desc&type=Repositories&page=${page}&per_page=10`
}