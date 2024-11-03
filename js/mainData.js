const mainData = () => {
    const preloader = document.querySelector('.preloder');

    const renderGenreList = genres => {
        const dropdownBlock = document.querySelector('.header__menu .dropdown')

        genres.forEach(genre => {
            dropdownBlock.insertAdjacentHTML(`beforeend`, `
                <li><a href="./categories.html?genre=${genre}">${genre}</a></li>
            `)
        })
    };

    const renderAnimeList = (array, genres) => {
        const wrapper = document.querySelector('.product__list');

        genres.forEach(genre => {
            const productBlock = document.createElement('div');
            const listBlock = document.createElement('div');
            const list = array.filter(item => item.genre == genre);

            productBlock.classList.add('mb-4')
            listBlock.classList.add('row');

            productBlock.insertAdjacentHTML(`beforeend`, `
                <div class="row">
                    <div class="col-lg-8 col-md-8 col-sm-8">
                        <div class="section-title">
                            <h4>${genre}</h4>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4">
                        <div class="btn__all">
                            <a href="./categories.html?genre=${genre}" class="primary-btn">View All <span class="arrow_right"></span></a>
                        </div>
                    </div>
                </div>
            `);

            list.forEach(item => {
                const tagsBlock = document.createElement('ul');

                item.tags.forEach(tag => {
                    tagsBlock.insertAdjacentHTML(`afterbegin`, `
                        <li>${tag}</li>
                    `);
                });

                listBlock.insertAdjacentHTML('beforeend', `
                    <div class="col-lg-4 col-md-6 col-sm-6">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" 
                                data-setbg="${item.image}">
                                <div class="ep">${item.rating} / 10</div>
                                <div class="view"><i class="fa fa-eye"></i> ${item.views}</div>
                            </div>
                            <div class="product__item__text">
                                ${tagsBlock.outerHTML}
                                <h5><a href="./anime-details.html?itemId=${item.id}">${item.title}</a></h5>
                            </div>
                        </div>
                    </div>
                `);
            });

            productBlock.append(listBlock);
            wrapper.append(productBlock);

            wrapper.querySelectorAll(".set-bg").forEach(elem => {
                elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
            });
        });

        setTimeout(() => {
            preloader.classList.remove('active');
        }, 500);
    }

    const renderTopAnime = array => {
        const wrapper = document.querySelector('.filter__gallery');

        array.forEach(item => {
            // console.log(item)
            wrapper.insertAdjacentHTML(`beforeend`, `
            <div class="product__sidebar__view__item set-bg mix" 
                data-setbg="${item.image}">
                <div class="ep">${item.rating} / 10</div>
                <div class="view"><i class="fa fa-eye"></i> ${item.views}</div>
                <h5><a href="./anime-details.html">${item.title}</a></h5>
            </div>
        `);

            wrapper.querySelectorAll(".set-bg").forEach(elem => {
                elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
            });

        });

    }

    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            const genres = new Set();

            data.anime.forEach((item) => {
                genres.add(item.genre);
            });

            renderTopAnime(data.anime.sort((a, b) => b.views - a.views).slice(0, 5));
            renderAnimeList(data.anime, genres);
            renderGenreList(genres);
        });
};

mainData();