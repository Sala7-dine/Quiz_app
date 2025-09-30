class BaseController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    // Méthode render pour afficher une vue EJS avec des données
    render(view, data = {}) {
        this.res.render(view, data);
    }

    // Exemple de méthode pour gérer les erreurs (optionnel)
    handleError(error) {
        console.error(error);
        this.res.status(500).send('Internal Server Error');
    }
}

module.exports = BaseController;