module.exports = {
    isOwner: function (request, response) {
        if (request.session.is_logined === true) {
            return true;
        } else {
            return false;
        }
    },
    statusUI: function (request, response) {
        var statusUI = `<a href="/auth/login">login</a>`
        if (this.isOwner(request, response)) {
            statusUI = `${request.session.nickname} | <a href="/auth/logout">logout</a>`
        }
        return statusUI
    }
}