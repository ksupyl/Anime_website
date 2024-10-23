const detailData = () => {
    const preloader = document.querySelector('.preloder');
    console.log(preloader);

    const renderGenreList = genres => {
        const dropdownBlock = document.querySelector('.header__menu .dropdown')

        genres.forEach(genre => {
            dropdownBlock.insertAdjacentHTML(`beforeend`, `
                <li><a href="./categories.html?genre=${genre}">${genre}</a></li>
            `)
        })
    };

    const renderAnimeDetails = (array, itemId) => {
        const animeObj = array.find(item => item.id == itemId);
        const imageBlock = document.querySelector('.anime__details__pic');
        const viewsBlock = imageBlock.querySelector('.view');
        const titleBlock = document.querySelector('.anime__details__title h3');
        const subTitleBlock = document.querySelector('.anime__details__title span');
        const descriptionBlock = document.querySelector('.anime__details__text p');
        const widgetList = document.querySelectorAll('.anime__details__widget ul li');
        const breadcrumbLinks = document.querySelector('.breadcrumb__links span')

        if (animeObj) {
            breadcrumbLinks.textContent = animeObj.genre;

            imageBlock.dataset.setbg = animeObj.image;
            viewsBlock.insertAdjacentHTML(`beforeend`, `
                <i class="fa fa-eye"></i> ${animeObj.views}
            `);

            titleBlock.textContent = animeObj.title;
            subTitleBlock.textContent = animeObj['original-title'];
            descriptionBlock.textContent = animeObj.description;

            widgetList[0].insertAdjacentHTML(`beforeend`, `
                <span>Date aired:</span> ${animeObj.date}
            `);
            widgetList[1].insertAdjacentHTML(`beforeend`, `
                <span>Raiting:</span> ${animeObj.rating}
            `);
            widgetList[2].insertAdjacentHTML(`beforeend`, `
                <span>Genre:</span> ${animeObj.tags.join(", ")}
            `);

            document.querySelectorAll(".set-bg").forEach(elem => {
                elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
            });

            setTimeout(() => {
                preloader.classList.remove('active');
            }, 500);
        } else {
            console.log('Anime is missing!');
        };
    }

    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            const genres = new Set();
            const itemIdParams = new URLSearchParams(window.location.search).get('itemId');

            data.anime.forEach((item) => {
                genres.add(item.genre);
            });

            if (itemIdParams) {
                renderAnimeDetails(data.anime, itemIdParams);
            } else {
                console.log('Anime is missing!');
            };

            renderGenreList(genres);
        });
};

detailData();