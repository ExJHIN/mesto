 class Api {
    constructor({baseUrl,headers}) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }
    
    getInfo() {
        return Promise.all([this.getInitialCards(), this.getProfile()])
      }
    
      getProfile(){
        return fetch(`${this._baseUrl}/users/me`,{
          headers: this._headers
        }).then(this._checkStatus());
        
      }
    
      getInitialCards() {
        return fetch(`${this._baseUrl}/cards`,{
          headers: this._headers
        }).then(this._checkStatus())
        
      }
    
      editProfile(name,about) {
        return fetch(`${this._baseUrl}/users/me`,{
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
            name,
            about
          })
        }).then(this._checkStatus())
       
      }
    
      addImage(name,link) {
        return fetch(`${this._baseUrl}/cards`,{
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({
            name,
            link
          })
        }).then(this._checkStatus())
        
      }
    
      deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`,{
          method: "DELETE",
          headers: this._headers,
        }).then(this._checkStatus())
        
      }
    
      deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`,{
          method: "DELETE",
          headers: this._headers,
        }).then(this._checkStatus())
        
      }
        
    
      addLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`,{
          method: "PUT",
          headers: this._headers,
        }).then(this._checkStatus())
       
      }
    
      editAvatar( avatar ) {
        return fetch(`${this._baseUrl}/users/me/avatar`,{
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
            avatar,
          })
        }).then(this._checkStatus())
        
      }
      _checkStatus() {
        return res => res.ok ? res.json() : Promise.reject(res.status); 
      } 
    }
 
  
  export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
    headers: {
      authorization: '1a9c818d-8c80-4566-ac65-ebfe34375ff2',
      'Content-Type': 'application/json'
    }
  });