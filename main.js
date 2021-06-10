document.addEventListener('DOMContentLoaded', () => {
    const API = 'https://603e38c548171b0017b2ecf7.mockapi.io';

    class HomesList {
        constructor(container = '.homes'){
            this.container = container;
            this.filtered = this.filter();
            this.homes = [];//массив домов
            this.allHomes = [];//массив объектов
            this._getProducts()
                .then(data => {
                    this.homes = [...data];
                    this.render();
                    this.filter();
                });
        }

        _getProducts(){
            return fetch(`${API}/homes`)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        }

        render(){
            const block = document.querySelector(this.container);
            for (let home of this.homes){
                const homeObj = new HomeItem(home);
                this.allHomes.push(homeObj);
                block.insertAdjacentHTML('beforeend', homeObj.render());
            }

        }

        filter (){
            const input = document.querySelector('#filter');
            input.addEventListener('keyup', function (){
                let filter = input.value.toLowerCase();
            });
        }

        /*filterHomes(){
            let filter = input.value.toLowerCase();
            if (filter.length>2) {
                let filterItems = document.querySelector ('.homes-item');
                filterItems.forEach(item=> {
                    if (item.title.toLowerCase().indexOf(filter) > -1){
                        item.style.display = '';
                    }else {
                        item.style.display = 'none';
                    }
                })
            }

        }*/
    }

    class HomeItem {
        constructor(home){
            this.title = home.title;
            this.price = home.price;
            this.id = home.id;
            this.address = home.address;
            this.type = home.type;
            this.img = `img/${this.id}.jpg`;
        }
        render(){
            return `<a href="#">
                         <div class="homes-item" data-name="${this.title}" data-id="${this.id}">
                            <img src="${this.img}" alt="Some img">
                            <div class="homes-descr">
                                <h3 class="homes-descr_name">${this.title}</h3>
                                <p>${this.address}</p>
                                <p>New Properties for Sale from <strong>&pound;${this.price}</strong></p>
                                <p class="homes-descr_small">Shared Ownership Available</p>
                            </div>
                         </div>
                    </a>`
        }
    }

    let homesList = new HomesList();
})