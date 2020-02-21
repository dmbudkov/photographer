<template>
    <div v-if="userInfo" class="page-wrapper">
        <page-header class="page-header--cabinet-page" :selectedTab="openedTab"  @selectedMenuItem="handleSelection($event)" :class="{'page-header--index page-header--profile': openedTab === 'tab3' }"></page-header>
        <div class="popup-overlay" v-if="showDateMaker || showDateEditor || openCreatePopup || openPostPopup || openEditPostPopup || showHotEvents || showStorage || showProgressNotification"  @click="showDateEditor = false; showDateEditor = false; openCreatePopup = false; openEditPostPopup = false; openPostPopup = false; showHotEvents = false; showStorage = false; showProgressNotification = false;"></div>
        <transition name="fade">
            <div class="popup" v-if="showProgressNotification">
                <div class="popup__inner">
                    <h4 class="popup__title">Поздравляем!</h4>
                    <p class="popup__text">Вы полностью заполнили свой профиль теперь вы размещены в каталоге
                        сервиса</p>
                    <button @click.prevent="closeNotification" class="popup__button button button--aqua">хорошо</button>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div v-if="showDateMaker" class="date-creation">
                <div class="date-creation__top">
                    <div @click="showDateMaker = false" class="date-creation__back back"></div>
                    <div @click="showDateMaker = false" class="date-creation__closer"></div>
                    <!--<div class="date-creation__more settings">-->
                    <!--<span class="settings__dot"></span>-->
                    <!--<span class="settings__dot"></span>-->
                    <!--<span class="settings__dot"></span>-->
                    <!--</div>-->
                    <div class="date-creation__text">
                        <time class="date-creation__date" v-text="makeHotDay.date"></time>
                        <h5 class="date-creation__title">Горящая дата</h5></div>
                </div>
                <div class="date-creation__form">
                    <div class="form form--profile form--create-date">
                        <div class="form__group">
                            <div class="form__group-name">За что</div>
                            <no-ssr>
                                <multiselect class="form__input"
                                             :class="{'input--error': hotDayInvalidFields.type}"
                                             v-model="makeHotDay.priceType"
                                             placeholder="Выберите тип"
                                             :options="userInfo.prices"
                                             :searchable="false"
                                             label="title"

                                >
                                </multiselect>
                            </no-ssr>
                            <transition name="fade">
                                <div class="form__input-error" v-if="hotDayInvalidFields.type">
                                    Укажите тип
                                </div>
                            </transition>
                        </div>

                        <div class="form__group">
                            <div class="form__group-name">Стоимость услуг</div>
                            <input type="number" v-model="makeHotDay.price" class="input input--full-width input--price" :class="{'input--error': hotDayInvalidFields.price}"/>
                            <div class="form__input-error" v-if="hotDayInvalidFields.price">
                                Укажите цену
                            </div>

                        </div>
                        <div class="form__group form__group--white">
                            <div class="form__group-button button button--violet" @click="makeHotEvent">Создать</div>
                            <div class="form__group-descr">
                                Горящих дат осталось: {{availableHotDates}}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </transition>

        <transition name="fade">
            <div v-if="showDateEditor" class="date-creation">
                <div class="date-creation__top">
                    <div @click="showDateEditor = false" class="date-creation__back back"></div>
                    <div @click="showDateEditor = false" class="date-creation__closer"></div>
                    <!--<div class="date-creation__more settings">-->
                    <!--<span class="settings__dot"></span>-->
                    <!--<span class="settings__dot"></span>-->
                    <!--<span class="settings__dot"></span>-->
                    <!--</div>-->
                    <div class="date-creation__text">
                        <time class="date-creation__date" v-text="hotDayData.date"></time>
                        <h5 class="date-creation__title">Горящая дата</h5></div>
                </div>
                <div class="date-creation__form">
                    <div class="form form--profile form--create-date">
                        <input type="hidden" :value="hotDayData.id"/>
                        <div class="form__group">
                            <div class="form__group-name">За что</div>
                            <no-ssr>
                                <multiselect class="form__input" v-model="hotDayData.priceType"
                                             placeholder="За"
                                             :options="userInfo.prices"
                                             :searchable="false"
                                             label="title"
                                >
                                </multiselect>
                            </no-ssr>
                        </div>
                        <div class="form__group">
                            <div class="form__group-name">Стоимость услуг</div>
                            <input type="number"  v-model="hotDayData.price" class="input input--full-width input--price"/>
                            <div class="form__group-descr">
                                Текущая стоимость: {{hotDayData.price}} руб./ <span v-if="hotDayData.priceType === 'full'">день</span><span v-if="hotDayData.priceType === 'hour'">час</span><span v-if="hotDayData.priceType === 'event'">выступление</span><span v-if="hotDayData.priceType === 'person'">за человека</span>
                            </div>
                        </div>

                        <div class="form__group form__group--white">
                            <div class="form__button-holder">
                                <div class="form__group-button button button--violet" @click="editHotEvent">Изменить</div>
                                <div class="form__group-button button button--gray" @click="deleteHotEvent">Удалить</div>
                            </div>
                            <div class="form__group-descr">
                                Горящих дат осталось: {{availableHotDates}}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </transition>
        <!--popup with stuff for creating a new event-->
        <div v-if="openCreatePopup" class="filter-tab filter-tab--centered" :class="{'filter-tab--popup': $store.state.desktop}">
            <div class="popup-overlay" v-if="openCreatePopup"  @click="openCreatePopup = false;"></div>
            <div class="filter-tab__top">
                <div class="filter-tab__closer" @click="openCreatePopup = false"></div>
                <div class="filter-tab__name">Новое событие</div>
            </div>
            <div class="filter-tab__items">
                <form action="" class="form form--reg" @submit.prevent="createEvent">
                    <div class="form__group">
                        <input type="text" v-model="createEventInProcess.name" placeholder="Логин/e-mail" class="form__input input"/>
                    </div>

                    <div class="form__date date">
                        <div class="date__name">Дата события</div>
                        <div class="date__element-holder">
                            <div class="date__element">
                                <label for="day" class="date__element-label">
                                    {{date.day}}
                                </label>
                                <select name="day" id="day" v-model="date.day">
                                    <option disabled>День</option>
                                    <option v-for="day in 31" :value="day" :key="day">{{day}}</option>
                                </select>
                            </div>

                            <div class="date__element">
                                <label for="month" class="date__element-label">
                                    {{date.month}}
                                </label>
                                <select name="month" id="month" v-model="date.month">
                                    <option disabled>Мес.</option>
                                    <option v-for="(month, index) in months" :value="index + 1" :key="month">{{month}}
                                    </option>
                                </select>
                            </div>
                            <div class="date__element">
                                <label for="year" class="date__element-label">
                                    {{date.year}}
                                </label>
                                <select name="year" id="year" v-model="date.year">
                                    <option disabled>Год</option>
                                    <option v-for="year in years" :value="year" :key="year">{{year}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form__group form__group--white">

                        <button class="form__button button button--violet button--filter">Создать</button>
                    </div>

                </form>
                <!--<div class="filter-tab__section">-->
                <!--<div class="filter-tab__section -name">Город</div>-->
                <!--<multi-select :searchable="true" class="multiselect&#45;&#45;searchable"-->
                <!--:show-labels="false" v-model="citySelected" track-by="name" label="name" value="Город" placeholder="Выберите город" :options="cityList"></multi-select>-->
                <!--</div>-->
            </div>
        </div>


        <!--popup with vendor's content selection-->

        <no-ssr>
            <transition name="fade">
                <content-storage
                        @showStorage="handleShowStorage($event)"
                        v-if="showStorage"
                        :videos="videoGalleryItems"
                        :photos="galleryItems"
                        :previewItems="previewItems"
                        :previewVideos="previewVideos"
                        :previewPhotos="previewPhotos"
                        :previewId="previewId"
                        @selectedItem="handleSelectedItem($event)"
                >

                </content-storage>
            </transition>
        </no-ssr>

        <no-ssr>
            <transition name="fade">
                <vendor-description @description="handleDescription($event)" @showDescription="handleShowDescription($event)" v-show="showDescription"></vendor-description>
            </transition>
        </no-ssr>

        <!--popup with vendor notifications-->
        <no-ssr>
            <transition name="fade">
                <vendor-notifications @showNotifications="handleShowNotifications($event)" v-if="showNotifications"></vendor-notifications>
            </transition>
        </no-ssr>

        <!--popup with vendor gallery-->
        <no-ssr>
            <transition name="fade">
                <gallery @showGallery="handleShowGallery($event)" @albumsChanged="handleUserAlbums($event)" :userAlbums="userAlbums" v-if="showGallery"></gallery>
            </transition>
        </no-ssr>


        <!--popup with vendor social networks-->
        <no-ssr>
            <transition name="fade">
                <vendor-social @showSocial="handleShowSocial($event)" v-if="showSocial"></vendor-social>
            </transition>
        </no-ssr>

        <!--popup with vendor video-->
        <no-ssr>
            <transition name="fade">
                <video-gallery @showVideoGallery="handleShowVideoGallery($event)" @resetVideoItems="handleResetVideoItems($event)" :videoGalleryItems="videoGalleryItems" v-if="showVideoGallery"></video-gallery>
            </transition>
        </no-ssr>


        <!--popup with vendor's hot events-->

        <no-ssr>
            <transition name="fade">
                <hot-events @showHotEvents="handleShowHotEvents($event)" v-if="showHotEvents"></hot-events>
            </transition>
        </no-ssr>


        <!--popup with vendor password changing-->
        <no-ssr>
            <transition name="fade">
                <vendor-password @showChangePassword="handleShowChangePassword($event)" v-if="showChangePassword"></vendor-password>
            </transition>
        </no-ssr>
        <!--popup with vendor unique params-->
        <transition name="fade">
            <vendor-params v-if="openParamsPopup" :vendorParams="vendorParams" :paramsToSelect="paramsToSelect" @paramsChecked="handleParamsChecked($event)" @showVendorParams="handleVendorParams($event)"></vendor-params>
        </transition>


        <!--popup with a post creation for vendor-->
        <transition name="fade">
            <div v-if="openPostPopup" class="filter-tab filter-tab--centered filter-tab--less-paddings"
                 :class="{'filter-tab--popup': $store.state.desktop}">
                <div class="filter-tab__top">
                    <div class="filter-tab__closer" @click="closePostCreating"></div>
                    <div class="filter-tab__name">Новый пост</div>
                </div>
                <div class="filter-tab__items">
                    <no-ssr>
                        <div class="drop-form">
                            <div class="drop-photo">
                                <drop-zone
                                        class="drop-photo__pic"
                                        ref="postCreate"
                                        :include-styling="false"
                                        :options="dropPostOptions"
                                        v-on:vdropzone-success="getPostSuccess"
                                        v-on:vdropzone-max-files-exceeded="changePostPic"
                                        id="dropNewPost"
                                        v-on:vdropzone-thumbnail="getPostThumbNail"
                                        :style="{'background-image': 'url(' + postCreating.thumb + ')'}">
                                </drop-zone>
                                <div class="drop-photo__placeholder">
                                       <span class="drop-photo__placeholder-pic">
                              <svg width="42px" height="33px" viewBox="0 0 42 33" version="1.1"
                                   xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="lk_vender" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.5">
        <g id="lk_add_event" transform="translate(-166.000000, -141.000000)" fill-rule="nonzero" fill="#889FBC">
            <g id="main" transform="translate(30.000000, 101.000000)">
                <g id="field">
                    <g id="photo-of-a-landscape" transform="translate(136.500000, 39.787234)">
                        <path d="M38.7694677,0.757936077 L2.85110189,0.757936077 C1.40848415,0.757936077 0.238808213,1.92753731 0.238808213,3.37015506 L0.238808213,30.1457918 C0.238808213,31.5883348 1.40848415,32.7579361 2.85110189,32.7579361 L38.7694677,32.7579361 C40.2121602,32.7579361 41.3818361,31.5883348 41.3818361,30.1457171 L41.3818361,3.37015506 C41.3818361,1.92753731 40.2122349,0.757936077 38.7694677,0.757936077 Z M38.7694677,3.37015506 L38.7694677,22.3683693 L33.6213698,17.6878729 C32.8475865,16.9845286 31.6576677,17.0126145 30.9183943,17.7525602 L25.7081487,22.9619842 L15.4349595,10.6909565 C14.6584124,9.76359669 13.2360374,9.75448369 12.4478376,10.6707137 L2.85110189,21.8237556 L2.85110189,3.37015506 L38.7694677,3.37015506 Z M27.6675184,10.2273139 C27.6675184,8.24329435 29.2752159,6.63544746 31.2592354,6.63544746 C33.2433297,6.63544746 34.8511019,8.24329435 34.8511019,10.2273139 C34.8511019,12.2113335 33.2434044,13.8191057 31.2592354,13.8191057 C29.2752906,13.8191804 27.6675184,12.2113335 27.6675184,10.2273139 Z"
                              id="Shape"></path>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg></span>
                                    <span class="drop-photo__placeholder-text">Загрузить фото</span>
                                </div>

                            </div>
                            <textarea name="" placeholder="Текст сообщения" class="drop-form__textarea textarea"
                                      v-model="postCreating.text"></textarea>
                            <div class="drop-form__button-holder">
                                <button class="button button--violet" @click.prevent="makeNewPost">Создать</button>
                            </div>
                        </div>

                    </no-ssr>
                </div>
            </div>
        </transition>
        <!--popup with a post editing for vendor-->
        <transition name="fade">
            <div v-if="openEditPostPopup" class="filter-tab filter-tab--centered filter-tab--less-paddings"
                 :class="{'filter-tab--popup': $store.state.desktop}">
                <div class="filter-tab__top">
                    <div class="filter-tab__closer" @click="openEditPostPopup = false"></div>
                    <div class="filter-tab__name">Редактирование</div>
                </div>
                <div class="filter-tab__items">
                    <form action="" class="drop-form">
                        <div class="drop-photo drop-photo--selected">
                            <drop-zone class="drop-photo__pic" ref="postEditing" :include-styling="false"
                                       :options="dropPostOptions" v-on:vdropzone-max-files-exceeded="editPostPic"
                                       v-on:vdropzone-success="getPostEditingSuccess" id="dropEditPost"
                                       v-on:vdropzone-thumbnail="getEditPostThumbNail"
                                       :style="{'background-image': 'url(' + postEditing.photo + ')'}">
                            </drop-zone>
                            <div class="drop-photo__placeholder">
                                       <span class="drop-photo__placeholder-pic">
                              <svg width="42px" height="33px" viewBox="0 0 42 33" version="1.1"
                                   xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="lk_vender" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.5">
        <g id="lk_add_event" transform="translate(-166.000000, -141.000000)" fill-rule="nonzero" fill="#fff">
            <g id="main" transform="translate(30.000000, 101.000000)">
                <g id="field">
                    <g id="photo-of-a-landscape" transform="translate(136.500000, 39.787234)">
                        <path d="M38.7694677,0.757936077 L2.85110189,0.757936077 C1.40848415,0.757936077 0.238808213,1.92753731 0.238808213,3.37015506 L0.238808213,30.1457918 C0.238808213,31.5883348 1.40848415,32.7579361 2.85110189,32.7579361 L38.7694677,32.7579361 C40.2121602,32.7579361 41.3818361,31.5883348 41.3818361,30.1457171 L41.3818361,3.37015506 C41.3818361,1.92753731 40.2122349,0.757936077 38.7694677,0.757936077 Z M38.7694677,3.37015506 L38.7694677,22.3683693 L33.6213698,17.6878729 C32.8475865,16.9845286 31.6576677,17.0126145 30.9183943,17.7525602 L25.7081487,22.9619842 L15.4349595,10.6909565 C14.6584124,9.76359669 13.2360374,9.75448369 12.4478376,10.6707137 L2.85110189,21.8237556 L2.85110189,3.37015506 L38.7694677,3.37015506 Z M27.6675184,10.2273139 C27.6675184,8.24329435 29.2752159,6.63544746 31.2592354,6.63544746 C33.2433297,6.63544746 34.8511019,8.24329435 34.8511019,10.2273139 C34.8511019,12.2113335 33.2434044,13.8191057 31.2592354,13.8191057 C29.2752906,13.8191804 27.6675184,12.2113335 27.6675184,10.2273139 Z"
                              id="Shape"></path>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg></span>
                                <span class="drop-photo__placeholder-text">Загрузить другое</span>
                            </div>

                        </div>
                        <textarea name="" placeholder="Текст сообщения" class="drop-form__textarea textarea"
                                  v-text="postEditing.text" v-model="postEditing.text"></textarea>
                        <div class="drop-form__button-holder">
                            <button class="button button--violet" @click.prevent="saveEditingPost(postEditing.id)">
                                Сохранить
                            </button>
                            <button class="button button--gray" @click.prevent="deleteEditingPost(postEditing.id)">
                                Удалить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </transition>
        <main class="main">
            <div class="main__background main__background--short">
                <div class="main__logo">
                    <svg width="268px" height="190px" viewBox="0 0 268 190" version="1.1" xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink">
                        <!-- Generator: Sketch 46.2 (44496) - http://www.bohemiancoding.com/sketch -->
                        <title>Combined Shape</title>
                        <desc>Created with Sketch.</desc>
                        <defs>
                            <linearGradient x1="139.039332%" y1="6.48995536%" x2="0%" y2="100%" id="linearGradient-1">
                                <stop stop-color="#00ADFF" offset="0%"></stop>
                                <stop stop-color="#06F6E1" offset="100%"></stop>
                            </linearGradient>
                            <linearGradient x1="3.00128483%" y1="98.0970982%" x2="136.164585%" y2="3.046875%" id="linearGradient-2">
                                <stop stop-color="#02DAB1" offset="0%"></stop>
                                <stop stop-color="#FF027D" offset="100%"></stop>
                            </linearGradient>
                            <path d="M0.00647789026,26.162599 C0.542118441,9.5577419 13.040398,3.48714899 13.040398,3.48714899 C26.9670523,-5.61874038 47.4999401,5.98680489 47.4999401,5.98680489 C47.4999401,5.98680489 227.122201,74.5487954 246.226714,83.4761379 C254.796962,87.5827155 260.867555,91.689293 263.902852,97.7598859 C267.652336,105.080307 267.295242,114.54329 267.295242,121.685164 C267.295242,134.540537 267.295242,222.271247 267.295242,244.23251 C267.295242,252.624212 265.68832,259.587539 262.831571,264.229757 C258.189353,271.550178 251.583119,273.69274 251.583119,273.69274 C251.583119,273.69274 49.4639554,372.967542 42.3220814,376.181385 C35.3587542,379.395228 24.1103027,382.609072 12.8618511,376.717026 C-0.707709511,369.575152 0.00647789026,363.863029 0.00647789026,353.863029 L0.00647789026,26.162599 Z M45.0415053,217.602384 C45.0415053,223.137336 45.2200522,326.044529 45.2200522,326.044529 C45.2200522,326.044529 44.5058648,332.472215 49.6837234,335.864606 C54.8615821,339.256996 59.8608939,335.686059 59.8608939,335.686059 C59.8608939,335.686059 226.980746,259.08946 235.015354,255.339976 C243.228509,251.411945 243.407056,243.912978 243.407056,239.092213 C243.407056,234.271448 243.407056,141.184332 243.407056,127.079131 C243.407056,112.97393 230.373136,117.794694 230.373136,117.794694 C219.481778,121.008538 210.911529,137.613395 193.949578,144.041081 C177.166175,150.468768 172.88105,142.43416 158.240208,147.969112 C143.599367,153.504065 135.921852,175.822421 114.317683,186.356685 C92.7135143,196.890949 76.8228447,182.250107 60.2179876,189.213435 C43.4345837,196.176762 45.0415053,212.067431 45.0415053,217.602384 Z"
                                  id="path-3"></path>
                        </defs>
                        <g id="main" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="фирменный-градиент">
                                <g>
                                    <g id="logo_min" transform="translate(0.000000, -45.000000)">
                                        <mask id="mask-4" fill="white">
                                            <use xlink:href="#path-3"></use>
                                        </mask>
                                        <g id="Combined-Shape" fill-rule="nonzero">
                                            <use fill="url(#linearGradient-1)" fill-rule="evenodd" xlink:href="#path-3"></use>
                                            <use fill="url(#linearGradient-2)" fill-rule="evenodd" xlink:href="#path-3"></use>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
            <!--vendor tabs-->

            <ul class="vendor-type vendor-type--cabinet" :class="{'vendor-type--in-tabs': openedTab !== 'tab3', 'vendor-type--profile': openedTab === 'tab3'}" ref="vendorTabs">
                <li class="vendor-type__item">
                    <nuxt-link to="/cabinet/chat/" class="vendor-type__label">Мои сообщения</nuxt-link>
                    <span class="vendor-type__item--event" v-show="hasUnread"></span>
                </li>
                <li class="vendor-type__item">
                    <input name="vendor-type" id="tab3" class="vendor-type__input" v-model="openedTab" value="tab3" type="radio"/>
                    <label for="tab3" class="vendor-type__label">
                        Профиль
                    </label>
                </li>
                <li class="vendor-type__item">
                    <input name="vendor-type" id="tab1" class="vendor-type__input" v-model="openedTab" value="tab1" type="radio"/>
                    <label for="tab1" class="vendor-type__label" v-if="$auth.$state.user.speciality.id !== 6">
                        Лента событий
                    </label>
                    <label for="tab1" v-else class="vendor-type__label">Услуги</label>
                </li>
                <li class="vendor-type__item">
                    <input name="vendor-type" id="tab2" class="vendor-type__input" v-model="openedTab" value="tab2" type="radio"/>
                    <label for="tab2" class="vendor-type__label">
                        Мой календарь
                    </label>
                </li>
                <li class="vendor-type__item">
                    <nuxt-link to="/cabinet/tenders/" class="vendor-type__label">Мои тендеры</nuxt-link>
                </li>
                <!--<li class="vendor-type__item">-->
                <!--<input name="vendor-type" id="tab4" class="vendor-type__input" v-model="openedTab" value="tab4" type="radio"/>-->
                <!--<label for="tab4" class="vendor-type__label">-->
                <!--Настройки-->
                <!--</label>-->
                <!--</li>-->
            </ul>
            <div class="tab-block tab-block--cabinet">
                <!--vendor-events-->
                <div class="tab-block__item tab-block__item--events" v-if="openedTab === 'tab1'">
                    <div class="tab-block__posts">
                        <vendor-posts :posts="vendorPosts"
                                      @openEditPost="handleOpenEditPost($event)"></vendor-posts>
                        <div class="tab-block__item-button tab-block__item-button--white tab-block__item-button--posts">

                            <button @click.prevent="openPostPopup = true;" class="button button--violet">
                                новый пост
                            </button>
                        </div>
                    </div>
                </div>
                <!--vendor-calendar-->
                <div class="tab-block__item tab-block__item--relative" v-if="openedTab === 'tab2'">
                    <div @click="showHotEvents = true;" class="message-item message-item--profile message-item--hot message-item--dates"><div class="message-item__pic"><img src="/app-icons/icon__hot-invert.svg" alt=""></div><div class="message-item__right">
                        <div class="message-item__name" v-if="availableHotDates > 0">
                            Горящих дат осталось: <span v-text="availableHotDates"></span>
                        </div>
                        <div class="message-item__name" v-else>
                            Купить еще горящих
                        </div>
                        <div v-if="availableHotDates < 1" class="message-item__button button button--aqua">купить</div>
                    </div></div>
                    <div class="tab-tip" v-if="showTip" @click="closeCalendarTip">
                        <div class="tab-tip__inner">      <div class="tab-tip__arrow"></div>
                            <div class="tab-tip__text">
                                Кликнув на сводобную дату вы можете сделать ее занятой или горящей.
                                Количество горящих дат ограничено.</div>
                            <div class="tab-tip__slot">3</div>
                            <!--<div class="tab-tip__button button button&#45;&#45;violet" @click="showHotEvents = true;">Подробнее</div>-->
                        </div>
                    </div>
                    <date-picker :makedHotEvent="makeHotDay.date" :availableHotDates="availableHotDates" :hotDays="vendorHotDates" :busyDays="vendorBusyDates"
                                @updateBusyDays="handleUpdateBusyDays($event)"
  @showPopup="handleShowPopup($event)"      @editHotDate="handleEditHotEvent($event)" @makeHotDate="handleMakeHotEvent($event);"></date-picker>
                </div>
                <!--vendor-profile-->
                <div class="tab-block__item tab-block__item--profile" v-if="openedTab === 'tab3'">
                    <div class="banner" v-if="userInfo.banner" :style="{'background-image': 'url(' + userInfo.banner.link + ')'}">
                        <drop-zone class="banner__upload upload" ref="userBannerPic" :include-styling="false" :options="dropBannerPic" v-on:vdropzone-max-files-exceeded="changeBannerPic" id="banner-dropzone" v-on:vdropzone-success="getBannerThumbNail"></drop-zone>

                    </div>
                    <div class="banner" v-else-if="!userInfo.banner">
                        <drop-zone class="banner__upload upload" ref="userBannerPic" :include-styling="false" :options="dropBannerPic" v-on:vdropzone-max-files-exceeded="changeBannerPic" id="banner-dropzone" v-on:vdropzone-success="getBannerThumbNail"></drop-zone>
                    </div>
                    <!--vendor-profile 100% filled-->
                    <!--<div class="tab-block__full" v-if="userInfo.progress === 100">-->
                    <!--<div class="tab-block__full-text">Вы полностью заполнили свой профиль теперь вы размещены в каталоге сервиса</div>-->
                    <!--<div class="tab-block__full-button button button&#45;&#45;aqua" @click="closeProgressNotification" >Хорошо</div>-->
                    <!--</div>-->



                    <form  action="" class="form form--profile form--desktop-holder">
                        <div class="events events--vendor">
                            <div class="events__list">
                                <div @click="showTabEvent('showPersonalInfo')" class="events__item message-item message-item--profile events__item--desktop" :class="{'message-item--active': showPersonalInfoDesktop}">
                                    <div class="message-item__pic"><img src="/app-icons/icon-profile__personal.svg" alt=""></div>
                                    <div class="message-item__right">
                                        <div class="message-item__name">
                                            Личная информация
                                        </div>
                                    </div>
                                </div>
                                <div @click="showTabEvent('showDescription')" :class="{'message-item--active': showDescriptionDesktop}" class="events__item message-item message-item--profile">
                                    <div class="message-item__pic"><img src="/app-icons/icon-profile__text.svg" alt=""></div>
                                    <div class="message-item__right">
                                        <div class="message-item__name">
                                            Текстовое описание
                                        </div>
                                    </div>
                                </div>
                                <div class="events__item message-item message-item--profile" :class="{'message-item--active': showGalleryDesktop}"  @click="showTabEvent('showGallery')">
                                    <div class="message-item__pic"><img src="/app-icons/icon-profile__photo.svg" alt=""></div>
                                    <div class="message-item__right">
                                        <div class="message-item__name">
                                            Фотогалерея
                                        </div>
                                    </div>
                                </div>
                                <div @click="showTabEvent('showVideoGallery')" :class="{'message-item--active': showVideoGalleryDesktop}" class="events__item message-item message-item--profile">
                                    <div class="message-item__pic"><img src="/app-icons/icon-profile__video.svg" alt=""></div>
                                    <div class="message-item__right">
                                        <div class="message-item__name">
                                            Видео ролики
                                        </div>
                                    </div>
                                </div>
                                <div @click="showTabEvent('openParamsPopup')" :class="{'message-item--active': openParamsPopupDesktop}" class="events__item message-item message-item--profile">
                                    <div class="message-item__pic"><img src="/app-icons/icon-profile__settings.svg" alt=""></div>
                                    <div class="message-item__right">
                                        <div class="message-item__name">
                                            Параметры
                                        </div>
                                    </div>
                                </div>
                                <div @click="showTabEvent('showSocial')" :class="{'message-item--active': showSocialDesktop}" class="events__item message-item message-item--profile events__item--desktop">
                                    <div class="message-item__pic"><img src="/app-icons/icon-profile__social.svg" alt=""></div>
                                    <div class="message-item__right">
                                        <div class="message-item__name">
                                            Социальные сети
                                        </div>
                                    </div>
                                </div>
                                <div @click="showTabEvent('showChangePassword')" :class="{'message-item--active': showChangePasswordDesktop}" class="events__item message-item message-item--password message-item--profile events__item--desktop">
                                    <div class="message-item__pic"><img src="/app-icons/icon-profile__pass.svg" alt=""></div>
                                    <div class="message-item__right">
                                        <div class="message-item__name">
                                            Смена пароля
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="vendor-description">
                            <span v-if="userInfo.speciality" class="vendor-description__spec">{{userInfo.speciality.title}}</span>
                            <span v-if="userInfo.placename" class="vendor-description__name">{{userInfo.placename}}</span>
                            <span v-else class="vendor-description__name">{{userInfo.firstName}} <br> {{userInfo.lastName}}</span>
                        </div>

                        <!--vendor description tab-->
                        <no-ssr>
                            <transition name="fade">
                                <vendor-description  @description="handleDescription($event)" @showDescription="handleShowDescription($event)" v-show="showDescriptionDesktop"></vendor-description>
                            </transition>
                        </no-ssr>

                        <!--vendor personal info tab-->

                        <div v-if="showPersonalInfoDesktop" class="form__group form__group--info personal">
                            <div class="form__group-name">Личная информация</div>
                            <div class="form__input-holder form__input-holder--email">
                                <input type="text"
                                       v-model="userInfo.email"
                                       class="form__input input input--profile input--fillable"
                                       :class="{'form__input--filled': $store.state.auth.user.email.length > 0}"
                                />
                                <span class="form__input-placeholder">Логин/e-mail</span>
                            </div>

                            <div class="form__input-holder">
                                <input type="text"
                                       v-model="userInfo.firstName"
                                       :class="{'form__input--filled': $store.state.auth.user.firstName.length > 0}"
                                       class="form__input input input--profile input--fillable"
                                />
                                <span class="form__input-placeholder">Имя</span>
                            </div>


                            <div class="form__input-holder">
                                <input type="text"
                                       v-model="userInfo.lastName"
                                       :class="{'form__input--filled': $store.state.auth.user.lastName.length > 0}"
                                       class="form__input input input--profile input--fillable"/>
                                <span class="form__input-placeholder">Фамилия</span>
                            </div>
                            <div class="form__input-holder"  v-if="[2,5,6].indexOf(userInfo.speciality.id) !== -1">
                                <input type="text"
                                       v-model="userInfo.placename"
                                       :class="{'form__input--filled': typeof $store.state.auth.user.placename !== 'null'}"
                                       class="form__input input input--profile input--fillable"/>
                                <span class="form__input-placeholder">Название</span>
                            </div>

                            <no-ssr>
                                <multiselect class="form__input" v-model="vendorData.sex" v-if="[2,6].indexOf(userInfo.speciality.id) === -1"
                                             placeholder="Пол"
                                             :options="sex"
                                             :searchable="false"
                                             @select="genderChanged"
                                             :class="{'multiselect--required': !genderPassed}"
                                             label="label">
                                </multiselect>
                            </no-ssr>

                            <no-ssr>
                                <div class="form__input-holder form__input-holder--city">
                                    <multiselect class="form__input multiselect--cabinet" :class="{'multiselect--filled':  currentCity.hasOwnProperty('id')}" v-model="currentCity"
                                                 placeholder="Город"
                                                 :options="cityList"
                                                 :searchable="true"
                                                 @select="cityChange"
                                                 label="title">
                                        <span slot="noResult">Город не найден</span>
                                    </multiselect>
                                </div>
                            </no-ssr>
                            <!--<div class="form__input-holder form__input-holder&#45;&#45;city">-->
                            <!--<input type="text"-->
                            <!--v-model="userInfo.cities[0].title"-->
                            <!--:class="{'form__input&#45;&#45;filled': $store.state.auth.user.cities[0].title.length > 0}"-->
                            <!--class="form__input input input&#45;&#45;profile input&#45;&#45;fillable"/>-->
                            <!--<span class="form__input-placeholder">Город</span>-->
                            <!--</div>-->
                            <!--<no-ssr>-->
                            <!--<multiselect class="form__input" v-model="$store.state.cityList"-->
                            <!--placeholder="Пол"-->
                            <!--:options="title"-->
                            <!--:searchable="false"-->
                            <!--label="title"-->
                            <!--&gt;-->
                            <!--</multiselect>-->
                            <!--</no-ssr>-->
                            <no-ssr>
                                <div class="form__input-holder">
                                    <masked-input class="form__input input input--fillable input--profile"
                                                  v-model="userInfo.phone"
                                                  :mask="['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
                                                  :class="{'form__input--filled': typeof $store.state.auth.user.phone !== 'null'}"
                                    />
                                    <span class="form__input-placeholder">Телефон</span>
                                </div>
                            </no-ssr>
                        </div>
                        <div v-if="showPersonalInfoDesktop" class="form__group form__group--prices personal">
                            <div class="form__group-name">Стоимость услуг</div>
                            <div v-if="userInfo.prices.length > 0" :data-code="price.code" v-for="(price, index) in userInfo.prices" :key="price.id" class="form__short-field short-field">
                                <input type="text" @keyup="changePrice" v-model.number="price.price" @keypress="isNumber($event)" class="short-field__input input input--price"/>
                                <label class="short-field__label">/<span v-text="price.title">день</span></label>
                            </div>
                        </div>
                        <div class="form__group form__group--card-preview" v-if="showPersonalInfoDesktop">
                            <div class="form__group-name">Превью портфолио</div>
                            <div class="form-group__holder">
                                <ul class="preview-items">

                                    <li class="preview-items__item" :class="[{'preview-items__item--photo': item.type === 'photo'}, {'preview-items__item--video': item.type === 'video'}, {'preview-items__item--empty': item.type === 'empty'}]"  v-for="(item, index) in previewItems" :key="index" :style="{'background-image': 'url(' + item.preview + ')'}">
                                        <span class="preview-items__item-layer" @click="showStorageEvent(index)" ></span>
                                        <span class="preview-items__item-holder " @click="showStorageEvent(index)">
                                            <span class="preview-items__item-icon"></span>
                                            <span class="preview-items__item-text" v-if="item.type === 'photo'">Фото</span>
                                            <span class="preview-items__item-text" v-else-if="item.type === 'video'">Видео</span>
                                            <span class="preview-items__item-text" v-else>Фото/видео</span>
                                                </span>
                                        <span class="preview-items__item-delete" v-show="item.type === 'photo' || item.type === 'video'" @click="deletePreviewItem(item.id, item.type, index)"></span>
                                    </li>
                                </ul>
                            </div>
                            <p>Выберите  3 своих работы (фото или видео) из портфолио для привлечения клиентов.
                                Эти работы будут отображены на десктопной версии в списке вендоров.</p>
                        </div>
                        <div v-if="showPersonalInfoDesktop" class="form__date form__date--bordered date personal">
                            <div class="date__name">Дата рождения</div>
                            <div class="date__element-holder">
                                <div class="date__element">
                                    <label for="day" class="date__element-label">
                                        {{date.day}}
                                    </label>
                                    <select name="day" id="day" v-model="date.day">
                                        <option disabled>День</option>
                                        <option v-for="day in 31" :value="day" :key="day">{{day}}</option>
                                    </select>
                                </div>

                                <div class="date__element">
                                    <label for="month" class="date__element-label">
                                        {{date.month}}
                                    </label>
                                    <select name="month" id="month" v-model="date.month">
                                        <option disabled>Мес.</option>
                                        <option v-for="(month, index) in months" :value="index + 1" :key="month">{{month}}
                                        </option>
                                    </select>
                                </div>
                                <div class="date__element">
                                    <label for="year" class="date__element-label">
                                        {{date.year}}
                                    </label>
                                    <select name="year" id="year" v-model="date.year">
                                        <option disabled>Год</option>
                                        <option v-for="year in years" :value="year" :key="year">{{year}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!--vendor notifications-->
                        <no-ssr>
                            <transition name="fade">
                                <vendor-notifications @showNotifications="handleShowNotifications($event)" v-if="showNotificationsDesktop"></vendor-notifications>
                            </transition>
                        </no-ssr>

                        <!--vendor gallery-->
                        <no-ssr>
                            <transition name="fade">
                                <gallery @showGallery="handleShowGallery($event)" @albumsChanged="handleUserAlbums($event)" :userAlbums="userAlbums" v-if="showGalleryDesktop"></gallery>
                            </transition>
                        </no-ssr>

                        <!--vendor social networks-->
                        <no-ssr>
                            <transition name="fade">
                                <vendor-social @showSocial="handleShowSocial($event)" v-if="showSocialDesktop"></vendor-social>
                            </transition>
                        </no-ssr>

                        <!--vendor video-->
                        <no-ssr>
                            <transition name="fade">
                                <video-gallery @showVideoGallery="handleShowVideoGallery($event)" @resetVideoItems="handleResetVideoItems($event)" :videoGalleryItems="videoGalleryItems" v-if="showVideoGalleryDesktop"></video-gallery>
                            </transition>
                        </no-ssr>

                        <!--vendor params-->
                        <transition name="fade">
                            <vendor-params v-if="openParamsPopupDesktop" :vendorParams="vendorParams" :paramsToSelect="paramsToSelect" @paramsChecked="handleParamsChecked($event)" @showVendorParams="handleVendorParams($event)"></vendor-params>
                        </transition>

                        <!--vendor change password-->
                        <no-ssr>
                            <transition name="fade">
                                <vendor-password @showChangePassword="handleShowChangePassword($event)" v-if="showChangePasswordDesktop"></vendor-password>
                            </transition>
                        </no-ssr>

                        <!--<div class="form__group form__group&#45;&#45;white">-->

                        <!--<div class="form__group-name">-->
                        <!--Аватар пользователя-->
                        <!--</div>-->
                        <!--&lt;!&ndash;<no-ssr>&ndash;&gt;-->
                        <!--&lt;!&ndash;<drop-zone  ref="userPic" :include-styling="false" id="dropzone" :options="dropzoneOptions" v-on:vdropzone-sending="sendingEvent">&ndash;&gt;-->
                        <!--&lt;!&ndash;</drop-zone>&ndash;&gt;-->
                        <!--&lt;!&ndash;</no-ssr>&ndash;&gt;-->
                        <!--<div class="avatar-control">-->
                        <!--<div class="avatar-control__item avatar-control__item&#45;&#45;avatar">-->
                        <!--<img ref="avatarPic" :src="userPic" alt="" v-if="userPic">-->

                        <!--</div>-->
                        <!--&lt;!&ndash;<div class="avatar-control__item avatar-control__item&#45;&#45;upload"></div>&ndash;&gt;-->
                        <!--<no-ssr>-->
                        <!--<drop-zone class="avatar-control__item avatar-control__item&#45;&#45;upload" ref="userPic" :include-styling="false" id="dropzone" :options="dropPostOptions" v-on:vdropzone-max-files-exceeded="changeUserPic" v-on:vdropzone-success="getThumbNail">-->
                        <!--</drop-zone>-->
                        <!--</no-ssr>-->
                        <!--<div @click="removeUserPic" class="avatar-control__item avatar-control__item&#45;&#45;delete"></div>-->
                        <!--</div>-->

                        <!--</div>-->
                        <div class="profile-pic" :class="{'profile-pic--default-pic': !profilePic}" :style="{'background-image': 'url(' + profilePic + ')'}">
                            <div class="profile-pic__top">Фото профиля</div>
                            <drop-zone class="profile-pic__upload upload upload--profile" ref="userProfilePic" :include-styling="false" id="dropzone" :options="dropPostOptions" v-on:vdropzone-max-files-exceeded="changeProfilePic" v-on:vdropzone-success="getProfileThumbNail"></drop-zone>
                            <div class="profile-pic__text">
                                <p v-if="userInfo.speciality">{{userInfo.speciality.title}}</p>
                                <p v-if="userInfo.placename">{{userInfo.placename}}</p>
                                <p v-else>{{userInfo.firstName}} {{userInfo.lastName}}</p>
                            </div>
                        </div>
                        <div @click="showSocial = true;" class="message-item message-item--profile message-item--wide">
                            <div class="message-item__right">
                                <div class="message-item__name">
                                    Социальные сети
                                </div>
                            </div>
                        </div>
                        <div @click="showChangePassword = true;" class="message-item message-item--password message-item--profile message-item--wide">
                            <div class="message-item__right">
                                <div class="message-item__name">
                                    Смена пароля
                                </div>
                            </div>
                        </div>
                        <!--vendor profile progress -->

                        <div class="profile-progress" v-if="userProgress < 100" :class="{'profile-progress--opened': progressDetailShow}">
                            <div class="profile-progress__top" @click="showProgressInfo">
                                <div class="profile-progress__text">Нажми и посмотри что осталось для вывода в каталоге</div>
                                <div class="profile-progress__bar"><div class="profile-progress__progress-line" :style="{'width': userProgress + '%'}"></div>
                                </div>
                            </div>
                            <div class="profile-progress__bottom">
                                <div class="profile-progress__fields">
                                    <div class="profile-progress__checkbox checkbox checkbox--round">
                                        <input id="testType" type="checkbox" class="checkbox__input" disabled :checked="userDescription">
                                        <label for="testType" class="checkbox__label"><span class="checkbox__name">Текстовое описание</span></label>
                                    </div>
                                    <div class="profile-progress__checkbox checkbox checkbox--round" v-if="userInfo.speciality.id !== 4">
                                        <input id="testType" type="checkbox" class="checkbox__input" disabled :checked="albumsFilled">
                                        <label for="testType" class="checkbox__label"><span class="checkbox__name">Фотогалерея</span></label>
                                    </div>
                                    <div class="profile-progress__checkbox checkbox checkbox--round" v-if="userInfo.speciality.id === 4">
                                        <input id="testType" type="checkbox" class="checkbox__input" disabled :checked="videoGalleryItems.length > 0">
                                        <label for="testType" class="checkbox__label"><span class="checkbox__name">Видеогалерея</span></label>
                                    </div>

                                    <div class="profile-progress__checkbox checkbox checkbox--round">
                                        <input id="testType" type="checkbox" class="checkbox__input" disabled :checked="paramsChecked">
                                        <label for="testType" class="checkbox__label"><span class="checkbox__name">Параметры</span></label>
                                    </div>
                                    <div class="profile-progress__checkbox checkbox checkbox--round">
                                        <input id="testType" type="checkbox" class="checkbox__input" disabled :checked="$store.state.auth.user.email && $store.state.auth.user.lastName && $store.state.auth.user.firstName && genderPassed && $store.state.auth.user.phone && $store.state.auth.user.cities.length > 0">
                                        <label for="testType" class="checkbox__label"><span class="checkbox__name">Личная информация</span></label>
                                    </div>
                                    <div class="profile-progress__checkbox checkbox checkbox--round" v-if="$store.state.auth.user.prices.length > 0">
                                        <input id="testType" type="checkbox" class="checkbox__input" disabled :checked="pricesPassed">
                                        <label for="testType" class="checkbox__label"><span class="checkbox__name">Стоимость</span></label>
                                    </div>
                                    <div class="profile-progress__checkbox checkbox checkbox--round">
                                        <input id="testType" type="checkbox" class="checkbox__input" disabled :checked="profilePic">
                                        <label for="testType" class="checkbox__label"><span class="checkbox__name">Фото профиля</span></label>
                                    </div>
                                    <!--<div class="profile-progress__checkbox checkbox checkbox&#45;&#45;round">-->
                                    <!--<input id="testType" type="checkbox" class="checkbox__input" disabled :checked="$store.state.auth.user.avatar">-->
                                    <!--<label for="testType" class="checkbox__label"><span class="checkbox__name">Аватар</span></label>-->
                                    <!--</div>-->
                                </div>
                                <button class="profile-progress__button button button--aqua" @click.prevent="showProgressInfo">Свернуть</button>
                            </div>
                        </div>
                        <transition name="fade">
                            <div v-if="showPersonalInfoDesktop" class="tab-block__fixed-item">
                                <button v-show="showSaveButton" class="button button--fixed button--violet" @click.prevent="saveVendorPersonalInfo">Сохранить</button>
                            </div>
                        </transition>
                    </form>



                </div>
                <!--vendor-settings-->
                <div class="tab-block__item" v-if="openedTab === 'tab4'">
                    <div class="events events--vendor">
                        <div class="events__list">
                            <div @click="showNotifications = true;" class="events__item message-item message-item--profile">
                                <div class="message-item__pic"><img src="/app-icons/icon-profile__notification.svg" alt=""></div>
                                <div class="message-item__right">
                                    <div class="message-item__name">
                                        Уведомления
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <!--vendor-tenders-->
                <div class="tab-block__item" v-if="openedTab === 'tab5'">
                            <div class="tenders">
                                    <div class="tenders__tabs-holder">
                                        <ul class="vendor-type vendor-type--tenders" ref="tenderTabs">
                                            <li class="vendor-type__item">
                                                <input name="vendor-type" id="new" class="vendor-type__input" v-model="openedTenderTab" value="new" type="radio"/>
                                                <label for="new" class="vendor-type__label">
                                                    Новые
                                                </label>
                                            </li>
                                            <li class="vendor-type__item">
                                                <input name="vendor-type vendor-type--tenders" id="saw" class="vendor-type__input" v-model="openedTenderTab" value="saw" type="radio"/>
                                                <label for="saw" class="vendor-type__label">
                                                    Просмотренные
                                                </label>
                                            </li>

                                            <li class="vendor-type__item">
                                                <input name="vendor-type" id="paid" class="vendor-type__input" v-model="openedTenderTab" value="paid" type="radio"/>
                                                <label for="paid" class="vendor-type__label">
                                                    Оплаченные
                                                </label>
                                            </li>
                                            <li class="vendor-type__item">
                                                <input name="vendor-type" id="participate" class="vendor-type__input" v-model="openedTenderTab" value="participate" type="radio"/>
                                                <label for="participate" class="vendor-type__label">
                                                    Участвую
                                                </label>
                                            </li>
                                            <li class="vendor-type__item">
                                            <input name="vendor-type" id="myTenders" class="vendor-type__input" v-model="openedTenderTab" value="myTenders" type="radio"/>
                                            <label for="myTenders" class="vendor-type__label">
                                                Мои тендеры
                                            </label>
                                            </li>
                                        </ul>
                                    </div>
                                <div class="tenders__items">
                                    <div class="tenders__item tender tender--detail">

                                        <div class="tender__top">
                                            <button class="tender__delete"></button>
                                        <time class="tender__date">1 мая в 19:00</time>
                                        <h5 class="tender__name">Фотограф на свадьбу, ни разу не дешево</h5>
                                        </div>
                                        <div class="tender__card vendor-card vendor-card--tender">
                                            <div class="vendor-card__image">

                                            </div>
                                            <div class="vendor-card__descr">
                                                <div class="vendor-card__name">Константин Константинопольский</div>
                                                <div class="vendor-card__role">
                                                    заказчик
                                                </div>
                                            </div>

                                        </div>
                                        <section class="tender__info">
                                            <div class="tender__info-item info-item info-item--violet">
                                                <div class="info-item__title">бюджет</div>
                                                <div class="info-item__text">100 000</div>
                                            </div>
                                            <div class="tender__info-item info-item">
                                                <div class="info-item__title">город</div>
                                                <div class="info-item__text">Комсомольск-на-Амуре</div>
                                            </div>
                                            <div class="tender__info-item info-item">
                                                <div class="info-item__title">истекает</div>
                                                <time class="info-item__text">29 сентября</time>
                                            </div>
                                            <div class="tender__info-item info-item">
                                                <div class="info-item__title">дата события</div>
                                                <time class="info-item__text">29 сентября</time>
                                            </div>

                                            <div class="tender__info-count">33</div>
                                        </section>
                                        <div class="tender__description">
                                            <p>Будто волшебник, разрушает невидимые цепи, сковывающие людей, позволяя им чувствовать себя легко и раскованно. Он по-настоящему «зажигает»</p> <p>гостей, заставляя их заряжать своими положительными эмоциями всех окружающих. В итоге маленькие огоньки сливаются в огромное пламя радости и счастья.</p></div>
                                        <div class="tender__responds">
                                            <div class="tender__responds-delimiter">
                                                <div class="tender__responds-text">Ваш ответ:</div>
                                            </div>
                                            <div class="tender__answer">
                                                <div class="tender__area-holder"><label for="comment"
                                                                                         class="tender__area-label">400 символов</label>
                                                    <textarea name="comment" id="comment"
                                                              placeholder="Опишите ваш подход к работе, укажите уникальные навыки или другую полезную информацию"
                                                              class="tender__area"></textarea></div>
                                                <button class="tender__button button--aqua">Откликнуться</button>
                                            </div>
                                            <div class="tender__respond tender__respond--finished">
                                                <time class="tender__respond-date">11 сентября в 11:23</time>
                                                 <div class="tender__respond-card vendor-card vendor-card--tender vendor-card--respond">
                <div class="vendor-card__image" style='background-image: url("/media/33/1540651719.059_1920_resized_400.jpg");'>

                </div>
                                                     <div class="vendor-card__descr">
                                                        <div class="vendor-card__holder">
                                                            <div class="vendor-card__name">Иван Иванов</div>
                                                         <div class="vendor-card__prices">
                                                             <span class="vendor-card__price">
                                                                 <span class="vendor-card__price-sum">30 000</span>
                                                             <span class="vendor-card__price-sum">₽</span>
                                                             <span class="vendor-card__price-delimiter"> / </span>
                                                                 <span
                                                                 class="vendor-card__price-for">день</span>
                                                                 <span class="vendor-card__price vendor-card__price--old">35 000 ₽</span></span><span
                                                                 class="vendor-card__price"><span
                                                                 class="vendor-card__price-sum">3 000</span><span
                                                                 class="vendor-card__price-sum">₽</span><span
                                                                 class="vendor-card__price-delimiter"> / </span><span class="vendor-card__price-for">час</span>
                                                         </span></div>
                                                        </div>
                                                         <span class="vendor-card__preview-holder"><ul
                                                                 class="vendor-card__preview preview-items preview-items--tender"><li
                                                                 class="preview-items__item preview-items__item--photo"
                                                                 style="background-image: url(&quot;/media/210/1540652557.7271_1920_resized_200.jpg&quot;);"><span
                                                                 class="preview-items__item-holder"><span
                                                                 class="preview-items__item-icon"></span><span
                                                                 class="preview-items__item-text">Фото/видео</span></span></li><li
                                                                 class="preview-items__item preview-items__item--photo"
                                                                 style="background-image: url(&quot;/media/98/1540652585.3409_1920_resized_200.jpg&quot;);"><span
                                                                 class="preview-items__item-holder"><span
                                                                 class="preview-items__item-icon"></span><span
                                                                 class="preview-items__item-text">Фото/видео</span></span></li><li
                                                                 class="preview-items__item preview-items__item--photo"
                                                                 style="background-image: url(&quot;/media/66/1540652587.9914_1920_resized_200.jpg&quot;);"><span
                                                                 class="preview-items__item-holder"><span
                                                                 class="preview-items__item-icon"></span><span
                                                                 class="preview-items__item-text">Фото/видео</span></span></li></ul></span>
                                                     </div>
                                </div>
                                                <div class="tender__respond-comment">
                                                    Будто волшебник, разрушает невидимые цепи, сковывающие людей, позволяя им чувствовать себя легко и раскованно. Он по-настоящему «зажигает» гостей, заставляя их заряжать своими положительными эмоциями всех окружающих.
                                                    В итоге маленькие огоньки сливаются в огромное пламя радости.
                                                </div>
                                                <div class="tender__respond-actions">
                                                                <div class="tender__respond-action">
                                                                    Отказаться от участия
                                                                </div>
                                                    <div class="tender__respond-action tender__respond-action--violet">
                                                       Ответить
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tender__time">До конца тендера 5 дней 14 часов</div>
                                    </div>
                                    <div class="tenders__item tender tender--new">
                                        <div class="tender__top">
                                            <div class="tender__edit settings settings--tender">
                                                <div class="settings__dot"></div>
                                                <div class="settings__dot"></div>
                                                <div class="settings__dot"></div>
                                            </div>
                                            <time class="tender__date">1 мая в 19:00</time>
                                            <h5 class="tender__name">Фотограф на свадьбу, ни разу не дешево</h5></div>
                                        <section class="tender__info">
                                            <div class="tender__info-item info-item info-item--violet">
                                                <div class="info-item__title">бюджет</div>
                                                <div class="info-item__text">100 000</div>
                                            </div>
                                            <div class="tender__info-item info-item">
                                                <div class="info-item__title">город</div>
                                                <div class="info-item__text">Комсомольск-на-Амуре</div>
                                            </div>
                                            <div class="tender__info-item info-item">
                                                <div class="info-item__title">истекает</div>
                                                <time class="info-item__text">29 сентября</time>
                                            </div>
                                            <div class="tender__info-item info-item">
                                                <div class="info-item__title">дата события</div>
                                                <time class="info-item__text">29 сентября</time>
                                            </div>

                                            <div class="tender__info-count">33</div>
                                        </section>
                                        <div class="tender__description">Будто волшебник, разрушает невидимые цепи, сковывающие людей, позволяя им чувствовать себя легко и раскованно. Он по-настоящему «зажигает» гостей, заставляя их заряжать своими положительными эмоциями всех окружающих. В итоге маленькие огоньки сливаются в огромное пламя радости и счастья.</div>

                                    </div>
                                </div>
                            </div>
                </div>
            </div>

        </main>
    </div>
</template>

<script>
    // import vue2Dropzone from 'vue2-dropzone';
    import PageHeader from '~/components/PageHeader/PageHeaderCabinet.vue';
    import MainFilter from '~/components/MainFilter.vue';
    import DatePicker from '~/components/Cabinet/Vendor/DatePicker.vue';
    import VendorPosts from '~/components/Cabinet/Vendor/VendorPosts.vue';
    import Gallery from '~/components/Cabinet/Vendor/Gallery.vue';
    import VideoGallery from '~/components/Cabinet/Vendor/VideoGallery.vue';
    import VendorNotifications from '~/components/Cabinet/Vendor/Notifications.vue';
    import ContentStorage from '~/components/Cabinet/Vendor/ContentStorage.vue';
    import VendorSocialNetworks from '~/components/Cabinet/Vendor/SocialNetworks.vue';
    import VendorPassword from '~/components/Cabinet/Vendor/ChangePassword.vue';
    import VendorParams from '~/components/Cabinet/Vendor/VendorParams.vue';
    import VendorHotEvents from '~/components/Cabinet/Vendor/HotEvents.vue';
    import VendorDescription from '~/components/Cabinet/Vendor/Description.vue';
    // import PageFooter from '~/components/PageFooter.vue';
    // import MaskedInput from 'vue-masked-input';
    import MaskedInput from 'vue-text-mask';
    import NoSSR from 'vue-no-ssr';
    import axios from 'axios';
    import fecha from 'fecha';
    import Multiselect from 'vue-multiselect';
    const  components = {
        'page-header': PageHeader,
        'main-filter': MainFilter,
        'multiselect': Multiselect,
        "no-ssr": NoSSR,
        "date-picker": DatePicker,
        // "drop-zone": vue2Dropzone,
        "gallery": Gallery,
        "content-storage": ContentStorage,
        "video-gallery": VideoGallery,
        "vendor-description": VendorDescription,
        "vendor-params": VendorParams,
        "vendor-notifications": VendorNotifications,
        "vendor-password": VendorPassword,
        "vendor-social": VendorSocialNetworks,
        "hot-events": VendorHotEvents,
        "vendor-posts": VendorPosts,
        "masked-input": MaskedInput,
        // 'page-footer': PageFooter,
    };
    if (process.browser) {
//    import vueSlider from 'vue-slider-component';
        const vSelect = require('vue-select');
        // const MaskedInput = require('vue-masked-input');
        const vueSlider = require('vue-slider-component');
        components['vueSlider'] = vueSlider;
        components['vSelect'] = vSelect;
        // components["masked-input"] = MaskedInput;
    }
    export default {
        name: 'Cabinet',
        auth: true,
        components,
//
        data() {
            return {
                dropzoneOptions: {
                    url: '/',
//                    thumbnailWidth: 60,
//                    thumbnailHeight: '100%',
                    resizeWidth: null,
                    resizeHeight: null,
                    thumbnailWidth: 1000,
                    thumbnailHeight: 600,
                    maxThumbnailFilesize: 4,
                    resizeMimeType: 'image/jpeg',
                    resizeQuality: 0.8,
                    maxFilesize: 5,
                    maxFiles: 1,
                },
                profilePicOptions: {
                    url: '/',
                    // paramName: "profilePic",
                    maxThumbnailFilesize: 4,
                    maxFilesize: 5,
                    maxFiles: 1,
                },
                avatarOptions: {
                    url: '/',
                    resizeWidth: null,
                    resizeHeight: null,
                    maxThumbnailFilesize: 4,
                    resizeMimeType: 'image/jpeg',
                    resizeQuality: 0.8,
                    maxFilesize: 5,
                    maxFiles: 1,
                },
                dropPostOptions: {
                    url: '/',
                    maxThumbnailFilesize: 15,
                    maxFiles: 1,
                    maxFilesize: 15
                },
                dropBannerPic: {
                    url: `/api/media?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    maxThumbnailFilesize: 15,
                    maxFiles: 1,
                    maxFilesize: 15
                },
                openedTab: 'tab3',
                openedTenderTab: 'new',
                // user info
                oldUserInfo: {},
                cityList: [],
                userDescription: '',
                userProgress: 0,
                type: '',
                // client
                openCreatePopup: false,
                // vendor

                //posts
                openEditPostPopup: false,
                editedPostId: null,
                openPostPopup: false,
                vendorPosts: [],

                //post creating
                postCreating: {
                    photo: '',
                    text: '',
                    thumb: '',
                },

                //post editing
                postEditing: {
                    id: '',
                    photo: '',
                    text: ''
                },

                // params
                openParamsPopup: false,
                openParamsPopupDesktop: false,
                // photo-gallery
                showGallery: false,
                showGalleryDesktop: false,
                // video-gallery
                showVideoGallery: false,
                showVideoGalleryDesktop: false,
                // settings
                showNotifications: false,
                showNotificationsDesktop: false,
                // social
                showSocial: false,
                showSocialDesktop: false,
                // change password
                showChangePassword: false,
                showChangePasswordDesktop: false,
                // personal info
                showPersonalInfo: true,
                showPersonalInfoDesktop: true,
                genderPassed: true,
                // description
                showDescription: false,
                showDescriptionDesktop: false,
                showHotEvents: false,
                paramsChecked: false,
                userPic: '',
                bannerPic: {},
                profilePic: '',
                availableHotDates: 1,
                // preview
                previewId: 0,
                previewItems: [],
                // previewVideos: [],
                // previewPhotos: [],
                //datemaker options
                showDateMaker: false,
                editedHotDate: {
                    date: '',
                    id: '',
                    priceType: '',
                    price: ''
                },
                galleryItems: [],
                userAlbums: [],
                albumsFilled: false,
                videoGalleryItems: [],
                vendorHotDates: [],
                vendorBusyDates: [],
                showDateEditor: false,
                showSaveButton: false,
                showProgressNotification: false,
                showStorage: false,
                validPrices: false,
                progressDetailShow: true,
                hotDayData: {
                    id: '',
                    date: '',
                    price: 0,
                    priceType: ''
                },
                showTip: true,
                createdEvents: [
                    {}
                ],
                priceType: [],
                pricesChanged: false,
                pricesPassed: true,
                makeHotDayType: {
                    label: '',
                    name: ''
                },
                makeHotDay: {
                    date: '',
                    price: 0,
                    priceType: ''
                },
                hotDayInvalidFields: {
                    type: false,
                    price: false
                },
                date: {
                    day: '10',
                    month: 'Март',
                    year: '1975'
                },
                vendorData: {
                    sex: {}
                },
                rangeSliderOptions: {
                    selectedDate: '',
                    width: "100%",
                    height: 3,
                    dotSize: 27,
                    interval: 100,
                    min: 0,
                    max: 50000,
                    disabled: false,
                    show: true,
                    tooltip: false,
                    tooltipDir: [
                        "top",
                        "top",
                    ],
                    processStyle: {
                        "backgroundColor": "#02CFB6"
                    },
                    sliderStyle: {
                        "paddingLeft": "0px",
                        "paddingRight": "0px"
                    },
                    bgStyle: {
                        "backgroundColor": "#889FBC"
                    }
                },
                filterData: {
                    costPer: '',
                    priceRange: [10000, 20000]
                },
                sex: [],
                currentCity: [],
                months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
                    "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
                years: [],
                createEventInProcess: {
                    name: '',
                    date: '',
                    needs: []
                },
                vendorParams: [],
                paramsToSelect: []
            }
        },
        props: {
            userInfo: {
                default: function() {
                    return this.$store.state.auth.user
                },
                type: Object
            }
        },
        computed: {
            previewItemsMerged: {
                get:  function () {
                    let photosArray = this.userInfo.photos_in_list;
                    let videosArray = this.userInfo.videos_in_list;
                    let mergedArray = [];
                    mergedArray.length = 3;
                    photosArray.forEach((el, ind) => {
                        el.type = 'photo';
                        el.preview = el.media.link;
                        mergedArray[el.sort] = el;
                    })
                    videosArray.forEach((el, ind) => {
                        el.type = 'video';
                        mergedArray[el.sort] = el;
                    })

                    if (mergedArray.includes(undefined)) {
                        for (let i = 0; i < mergedArray.length; i++) {
                            if (typeof mergedArray[i] === "undefined") {
                                mergedArray[i] = {type: 'empty', preview: '', sort: i};
                            }
                        }
                    }
                    return mergedArray;
                },
                // set: function (newVal) {
                //     return newVal;
                // }
            },
            previewVideos: function () {
                let videosArray = this.userInfo.videos_in_list;
                let resultArray = [];
                videosArray.forEach((el, ind) => {
                    resultArray.push({id: el.id, sort: el.sort});
                })
                return resultArray;
            },
            previewPhotos: function () {
                let photosArray = this.userInfo.photos_in_list;
                let resultArray = [];

                photosArray.forEach((el, ind) => {
                    resultArray.push({id: el.id, sort: el.sort});
                })
                return resultArray;
            },
            hasUnread: function () {

                if(typeof this.$store.state.availableChats != 'undefined' && this.$store.state.availableChats.length != 0){
                    for (let el of this.$store.state.availableChats){
                        if(el.read === 0)
                            return true;
                    }
                }

                return false;
            }
        },
        watch: {
            userProgress: {
                handler: function (newVal) {
                    if(+newVal === 100 && !this.paramsChecked) {
                        this.userProgress = 75;
                    }
                }
            },
            paramsChecked: {
                handler: function (newVal) {
                    if(+this.userProgress === 75 && newVal) {
                        this.userProgress = 100;
                    }
                }
            },
            // previewItems: {
            //     handler: function (newValue) {
            //         console.log('newVal', newValue)
            //     },
            //     deep: true
            // },
            currentCity: {
                handler: function (newValue) {
                    this.userInfo.cities[0] = newValue.id
                }
            },
            userPic: {
                handler: function (newValue) {
                    if(this.userInfo.avatar !== newValue) {
                        this.userInfo.avatar = newValue;
                    }
                }
            },
            userInfo: {
                handler: function(newValue) {

                    if(newValue.prices) {
                        for (let i = 0; i < newValue.prices.length; i++) {
                            if(!newValue.prices[i].price) {
                                this.pricesPassed = false;
                                break;
                            } else {
                                this.pricesPassed = true;
                            }
                        }
                    }
                    if(this.oldUserInfo.avatar !== newValue.avatar ||
                        this.oldUserInfo.birthday !== newValue.birthday ||
                        this.oldUserInfo.email !== newValue.email ||
                        this.oldUserInfo.firstName !== newValue.firstName ||
                        this.oldUserInfo.lastName !== newValue.lastName ||
                        this.oldUserInfo.gender !== newValue.gender ||
                        this.oldUserInfo.phone !== newValue.phone || this.oldUserInfo.placename !== newValue.placename) {
                        this.showSaveButton = true;
                    }
                    Object.assign(this.oldUserInfo, newValue)
                },
                deep: true
            },
            date: {
                handler: function (newValue) {
                    let month = newValue.month;
                    if(typeof newValue.month === 'string') {
                        month = this.months.indexOf(month) + 1;
                    } else {
                        if (+newValue.month < 10) {
                            month = `${newValue.month}`;
                        }
                    }
                    if (typeof newValue.day !== "undefined" && typeof newValue.month !== "undefined" && typeof newValue.year !== "undefined") {
                        this.userInfo.birthday = `${newValue.year}-${month}-${newValue.day}`;
                    }
                },
                deep: true

            },
        },
        methods: {
            showStorageEvent(index) {
            this.getVendorGallery();
            this.showStorage = true;
            this.previewId = index;
            },
            startDialog(userInfo) {
                let chats = this.$store.state.availableChats;
                let itemInChats = chats.findIndex((el) => {
                    return el.id === userInfo.id;
                });
                if(itemInChats === -1) {
                    chats.push({
                        body: '',
                        created_at: new Date(),
                        id: userInfo.id,
                        interlocutor: {
                            firstName: userInfo.firstName,
                            lastName: userInfo.lastName,
                            profile_pic: userInfo.userPic
                        },
                        read: true,
                        selfMessage: true,
                        new: true,
                        user: this.$store.state.auth.user,
                        user_id: this.$store.state.auth.user.id,
                        user_to: userInfo.id
                    });
                    this.$store.commit({
                        type: 'setAvailableChats',
                        chats: chats
                    });
                    this.$store.commit({
                        type: 'setCurrentDialog',
                        userInfo: {
                            name: `${userInfo.firstName} ${userInfo.lastName}`,
                            userPic: userInfo.userPic
                        }
                    });
                }
                this.$router.push(`/cabinet/chat/${userInfo.id}`);
            },
            isNumber(evt) {
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                    evt.preventDefault();;
                } else {
                    return true;
                }
            },
            deletePreviewItem (id, type, index) {
                let dataObj = {
                    photos: [],
                    videos: []
                }
                // let previewItems = this.previewItems;
                // if(type === 'video') {
                //     previewItems.splice(index, 1, {type: 'empty', preview: '', sort: index});
                //     this.previewItems = previewItems;
                // this.previewItems[index] = ;
                // }
                this.$set(this.previewItems, index, {type: 'empty', preview: '', sort: index});
                for(let i = 0; i < this.previewItems.length; i++) {
                    if(this.previewItems[i].type === 'video') {
                        dataObj.videos.push({id: this.previewItems[i].id, sort: this.previewItems[i].sort})
                    } else if(this.previewItems[i].type === 'photo') {
                        dataObj.photos.push({id: this.previewItems[i].id, sort: this.previewItems[i].sort})
                    }
                }
                this.$axios({
                    method: 'post',
                    url: `/api/vendors/media/preview?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: dataObj
                }).then((response) => {



                })
            },
            genderChanged(selectedOption) {

                this.$axios({
                    method: 'patch',
                    url: `/api/vendors/properties?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: [{propertyId: selectedOption.groupId, values: [selectedOption.id]}]
                }).then((response) => {
                    if(response.data.result === 'ok')  {
                        this.showSaveButton = true;
                        this.genderPassed = true;
                    }
                })
            },
            getCities() {
                this.$axios({
                    method: 'get',
                    url: '/api/city'
                }).then((response) => {
                    this.cityList = response.data;
                    //  choose current city from list
                    for (let i = 0; i < this.cityList.length; i++) {
                        if(this.cityList[i].id === this.userInfo.cities[0].id) {
                            this.currentCity = this.cityList[i];

                            this.$store.commit({type: 'setProfileCity', cityData: this.cityList[i]})
                            break;
                        }
                    }
                    // this.$store.commit({type: 'setProfileCity', cityData: currentCity})
                })
            },
            cityChange(selected) {
                if(!this.showSaveButton) {
                    this.showSaveButton = true;

                }
            },
            changePrice(event) {
                if(!this.showSaveButton) {
                    this.showSaveButton = true;
                }
            },
            showTabEvent(tab) {
                let tabType = tab;
                if (this.$store.state.desktop) {
                    tabType += 'Desktop';
                    this.openParamsPopupDesktop = false;
                    this.showGalleryDesktop = false;
                    this.showVideoGalleryDesktop = false;
                    this.showNotificationsDesktop = false;
                    this.showSocialDesktop = false;
                    this.showPersonalInfoDesktop = false;
                    this.showDescriptionDesktop = false;
                    this.showChangePasswordDesktop = false;
                }
                this[tabType] = true;

            },
            showPersonalEvent() {
                this.showPersonal = true;
            },
            checkAlbumsFilled() {
                if(this.userAlbums.length > 0) {
                    for (let i = 0; i < this.userAlbums.length; i++) {
                        if (this.userAlbums[i].photos.length > 0) {
                            this.albumsFilled = true;
                            return true;
                        } else {
                            this.albumsFilled = false;
                        }
                    }
                } else {
                    this.albumsFilled = false;
                }
            },
            handleUserAlbums(data) {
                if(data !== null) {
                    this.userAlbums = data;
                }
                this.checkAlbumsFilled();
                // TODO: нужен метод для отдельного запроса прогресса заполнения профиля
                this.$axios({
                    method: 'get',
                    url: `/api/vendor/progress/${this.userInfo.id}`
                }).then((resp) => {
                    this.userProgress = resp.data;

                })
            },
            handleVendorParams(event) {
                this.openParamsPopup = event;
                this.openParamsPopupDesktop = event;
            },
            handleParamsChecked(event) {
                this.paramsChecked = event;
            },
            getVendorVideos() {
                this.$axios({
                    method: 'get',
                    url: `/api/videos?${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                }).then((response) => {
                    this.videoGalleryItems = response.data;
                });
            },
            showProgressInfo() {
                let header = document.querySelector('.page-header');
                if(!this.progressDetailShow) {
                    this.progressDetailShow = true;
                } else {
                    this.progressDetailShow = false;
                }
                this.showProgressNotification = false;
            },
            closeNotification() {
                if(!this.userInfo.saw_progress_popup) {

                    axios({
                        method: 'patch',
                        url: `/api/users?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                        data: {
                            saw_progress_popup: true
                        }
                    }).then((response) => {
                        if(response.data.saw_progress_popup) {
                            this.userInfo.saw_progress_popup = 1;
                            this.showProgressNotification = false;
                        }
                    })
                }
            },
            closeCalendarTip() {
                this.showTip = false;
                axios({
                    method: 'patch',
                    url: `/api/users?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: {
                        saw_calendar_popup: true
                    }
                });
            },

            // personal info saving

            saveVendorPersonalInfo() {
                if(!this.vendorData.sex.hasOwnProperty('id')) {
                    if([2, 6].indexOf(this.userInfo.speciality.id) === -1) {
                        this.genderPassed = false;
                        return;
                    }
                }
                axios({
                    method: 'patch',
                    url: `/api/users?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: {...this.userInfo}
                }).then((response) => {
                    this.$auth.fetchUser();
                    this.userProgress = response.data.progress;
                    this.showSaveButton = false;
                });
            },
            //posts
            makeNewPost() {
                axios({
                    method: 'post',
                    url: `/api/posts/?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: {
                        text: this.postCreating.text,
                        photo: this.postCreating.photo,
                        token: this.$auth.$storage['_state']['_token.local'].split(' ')[1]
                    }
                }).then((response) => {
                    this.getVendorPosts();
                    this.openPostPopup = false;
                    this.postCreating = {
                        photo: '',
                        text: '',
                        thumb: ''
                    }
                });
            },
            closePostCreating() {
                this.openPostPopup = false;
                this.postCreating = {
                    photo: '',
                    text: '',
                    thumb: ''
                }
            },
            saveEditingPost(id) {
                axios({
                    method: 'patch',
                    url: `/api/posts/${id}`,
                    data: {
                        photo: this.postEditing.photo,
                        text: this.postEditing.text,
                        token: this.$auth.$storage['_state']['_token.local'].split(' ')[1]
                    }
                }).then((response) => {
                    this.$auth.fetchUser();
                    this.openEditPostPopup = false;
                });
            },
            deleteEditingPost(id) {
                axios({
                    method: 'delete',
                    url: `/api/posts/${id}`,
                    data: {
                        token: this.$auth.$storage['_state']['_token.local'].split(' ')[1]
                    }
                }).then((response) => {
                    this.openEditPostPopup = false;
                    this.getVendorPosts();
                });
            },

            sendingEvent(file, xhr, formData) {
//                   return {file: file, xhr: xhr, formData: formData};
            },
            getThumbNail(file, dataUrl) {
                this.userPic = dataUrl;
                axios({
                    method: 'patch',
                    url: `/api/users?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: {avatar: dataUrl}
                }).then((response) => {
                });

            },
            getEditPostThumbNail(file, dataUrl) {
                // this.postEditing.thumb = dataUrl;
            },
            getPostEditingSuccess(file, xhr) {
                this.postEditing.thumb = xhr;
                this.postEditing.photo = xhr;
            },
            getPostSuccess(file, xhr) {

                this.postCreating.photo = xhr;
                this.postCreating.thumb = xhr;

            },
            getPostThumbNail(file, dataUrl) {
            },
            postAdded(file) {
            },
            getProfileThumbNail(file, xhr) {
                this.profilePic = xhr;

                axios({
                    method: 'patch',
                    url: `/api/users?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: {profilePic: xhr}
                }).then((response) => {
                    this.$auth.fetchUser();
                });
            },
            getBannerThumbNail(file, xhr) {
                this.bannerPic = xhr;
                axios({
                    method: 'patch',
                    url: `/api/users?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: {banner_id: xhr.id}
                }).then((response) => {
                    this.userInfo.banner_id = response.data.banner_id;
                    this.userInfo.banner = response.data.banner;
                });
            },
            changeUserPic(file) {
                this.$refs.userPic.removeAllFiles();
                this.$refs.userPic.addFile(file);
                this.userPic = file.dataURL;
            },
            changeBannerPic(file) {

                this.$refs.userBannerPic.removeAllFiles();
                this.$refs.userBannerPic.addFile(file);

                // this.bannerPic = file.dataURL;
            },
            changePostPic(file) {
                // this.postCreating.photo = file.dataURL;
                this.$refs.postCreate.removeAllFiles();
                this.$refs.postCreate.addFile(file);
            },
            editPostPic(file) {
                this.$refs.dropEditPost.removeAllFiles();
                this.$refs.dropEditPost.addFile(file);
                this.postEditing.photo = dataUrl;
            },
            changeProfilePic(file) {
                this.$refs.userProfilePic.removeAllFiles();
                this.$refs.userProfilePic.addFile(file);
                this.profilePic = file.dataURL;
            },
            removeUserPic() {
                this.$refs.userPic.removeAllFiles();
                this.userPic = '';
                axios({
                    method: 'patch',
                    url: `/api/users?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: {avatar: ''}
                }).then((response) => {
                    this.$auth.fetchUser();
                });
            },
            handleMakeHotEvent(event) {
                this.makeHotDay.date = fecha.format(event.date, 'YYYY.MM.DD');
                this.showDateMaker = event.showPopup;
            },
            handleEditHotEvent(event) {
                this.editedHotDate.date = event.hotDayData.date;
                this.showDateEditor = event.showPopup;
                this.hotDayData = event.hotDayData;
            },
            handleShowPopup(val) {
                console.log(val)
                this.showHotEvents = val;
            },
            handleUpdateBusyDays(val) {
                this.vendorBusyDates = val;
            },
            makeHotEvent() {
                for(let key in this.makeHotDay) {
                    if(key === "priceType") {
                        if(typeof this.makeHotDay[key] !== "object") {
                            this.hotDayInvalidFields.type = true;
                        } else {
                            this.hotDayInvalidFields.type = false;
                        }
                    } else if(key === 'price') {
                        if(this.makeHotDay[key] < 1) {
                            this.hotDayInvalidFields.price = true;
                        } else {
                            this.hotDayInvalidFields.price = false;
                        }
                    }
                }
                if(!this.hotDayInvalidFields.type && !this.hotDayInvalidFields.price) {
                    let vendorHotDatesArray = [];
                    for (let i = 0; i < this.vendorHotDates.length; i++) {
                        vendorHotDatesArray.push(this.vendorHotDates[i].date);
                    };
                    if (vendorHotDatesArray.indexOf(this.makeHotDay.date) === -1) {
                        this.postVendorHotDates(this.$auth.$storage['_state']['_token.local'].split(' ')[1]);
                        this.vendorHotDates.push(this.makeHotDay);
                        this.showDateMaker = false;
                        this.makeHotDay = {
                            date: '',
                            type: '',
                            price: 0,
                        };
                    }
                }
            },

            deleteHotEvent() {
                let vendorHotDatesArray = [];
                for (let i = 0; i < this.vendorHotDates.length; i++) {
                    vendorHotDatesArray.push(this.vendorHotDates[i].date);
                };
                const dateIndex = vendorHotDatesArray.indexOf(this.hotDayData.date);
                if (dateIndex > -1) {
                    this.deleteVendorHotDates(this.hotDayData.id);
                    this.getVendorDates(this.$auth.$storage['_state']['_token.local'].split(' ')[1]);
                    this.showDateEditor = false;
//                    this.vendorHotDates.splice(dateIndex, 1);
                }
            },
            closeProgressNotification() {
            },
            handleShowGallery(data) {
                this.showGallery = data.showGallery;

            },
            handleShowHotEvents(data) {
                this.showHotEvents = data.showHotEvents;
            },
            handleShowStorage(data) {
                this.showStorage = data.showStorage;
            },
            handleSelection(tab) {
                this.openedTab = tab;
            },
            handleSelectedItem(data) {
                const dataObj = {
                    photos: [],
                    videos: []
                };
                this.previewItems[data.previewId] = {preview: data.previewPic, id: data.id, sort: data.previewId, type: data.type}
                for(let i = 0; i < this.previewItems.length; i++) {
                    if(this.previewItems[i].type === 'photo') {
                        dataObj.photos.push({id: this.previewItems[i].id, sort: this.previewItems[i].sort})
                    } else if(this.previewItems[i].type === 'video') {
                        dataObj.videos.push({id: this.previewItems[i].id, sort: this.previewItems[i].sort})
                    }
                }
                this.$axios({
                    method: 'post',
                    url: `/api/vendors/media/preview?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: dataObj
                }).then((response) => {
                })
            },
            handleShowSocial(data) {
                this.showSocial = data.showSocial;
                this.userInfo.vk = data.social.vk;
                this.userInfo.yt = data.social.yt;
                this.userInfo.fb = data.social.fb;
                this.userInfo.vimeo = data.social.vimeo;

            },
            handleShowDescription(data) {
                this.showDescription = data.showDescription;
            },
            handleDescription(data) {
                this.userDescription = data.description;

                this.userProgress = data.progress;
            },
            handleShowNotifications(data) {
                this.showNotifications = data.showNotifications;
            },
            handleShowVideoGallery(data) {
                this.showVideoGallery = data.showVideoGallery;
            },
            handleResetVideoItems(data) {
                this.videoGalleryItems = data;
            },
            handleShowChangePassword(data) {
                this.showChangePassword = data.showChangePassword;
            },
            // posts
            handleOpenEditPost(data) {
                this.openEditPostPopup = data.openEditPostPopup;
                this.editedPostId = data.postIndex;
                this.postEditing = this.vendorPosts[data.postIndex];
            },
            editHotEvent() {
                let vendorHotDatesArray = [];
                let hotDayData = {};

                for (let i = 0; i < this.vendorHotDates.length; i++) {
                    vendorHotDatesArray.push(this.vendorHotDates[i].date);
                };
                const dateIndex = vendorHotDatesArray.indexOf(this.hotDayData.date);
                if (dateIndex > -1) {
                    hotDayData = this.hotDayData;
                    hotDayData.priceType = this.hotDayData.priceType.type;
                    hotDayData.price = this.hotDayData.price;
                    hotDayData.id = this.hotDayData.id;
                    this.vendorHotDates[dateIndex] = this.hotDayData;

                    axios({
                        method: 'patch',
                        url: `/api/vendor/calendar?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                        data: [{...hotDayData}]
                    }).then((response) => {

                    });
                    this.showDateEditor = false;
                }
            },
            createEvent() {
                this.openCreatePopup = true;
            },
            getVendorProperties(accessToken) {
                axios({
                    method: 'get',
                    url: `/api/vendors/properties?token=${accessToken}`,
                }).then((response) => {
                    let checkedParams = [];
                    let genderIndex;
                    for(let key in response.data) {
                        if(response.data[key].code === 'gender') {
                            genderIndex = key;
                            for(let genderItem in response.data[key].values) {
                                let sexItem = {
                                    label: response.data[key].values[genderItem].title,
                                    name: response.data[key].values[genderItem].code,
                                    id: response.data[key].values[genderItem].id,
                                    groupId: response.data[key].id
                                }
                                if(response.data[key].values[genderItem].checked) {
                                    this.vendorData.sex = sexItem;
                                }
                                this.sex.push(sexItem);
                            }
                            continue;
                        }
                        let checkedValues = [];
                        if(Object.keys(response.data[key].values).length > 0) {
                            for (let value in response.data[key].values) {
                                if (response.data[key].values[value].checked) {
                                    checkedParams.push(response.data[key].values[value].id);
                                    checkedValues.push(response.data[key].values[value].id);
                                }
                            }
                        }
                        this.paramsToSelect.push({propertyId: response.data[key].id, values: checkedValues});
                    }
                   if(genderIndex) {
                       response.data.splice(genderIndex, 1);
                   }
                    this.vendorParams = response.data;

                    if(checkedParams.length > 0) {
                        this.paramsChecked = true;
                    }

                });
            },
            getVendorDates(accessToken) {
                axios({
                    method: 'get',
                    url: `/api/vendor/calendar/?token=${accessToken}`
                }).then((response) => {
                    const busyDates = [];
                    const hotDates = [];
                    for(let i = 0; i < response.data.length; i++) {
                        if (response.data[i].price !== null) {
                            hotDates.push(response.data[i]);
                        } else {
                            busyDates.push(response.data[i]);
                        }
                    }
                    this.vendorBusyDates = busyDates;
                    this.vendorHotDates = hotDates;
                });
            },
            postVendorHotDates(accessToken) {
                let makeHotDay = this.makeHotDay;
                makeHotDay.priceType = this.makeHotDay.priceType.type;
                axios({
                    method: 'post',
                    url: `/api/vendor/calendar/?token=${accessToken}`,
                    data: [{...makeHotDay}]
                }).then((response) => {
                    this.getAvailableDates();
                });
            },
            deleteVendorHotDates(dateId) {

                const dateIdArray = [];
                if(Number.isInteger(dateId)) {
                    dateIdArray.push(dateId);
                }
                axios({
                    method: 'delete',
                    url: `/api/vendor/calendar/?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: dateIdArray
                }).then((response) => {
                    this.getAvailableDates();
                });
            },
            getUploadedFiles() {
            },
            getVendorPrices() {
                axios({
                    method: 'get',
                    url: `/api/catalog/priceTypes/${this.userInfo.speciality_id}/`,
                }).then((response) => {
                    let uniquePriceElements = [];
                    if (this.userInfo.prices.length !== response.data.length) {

                        function comparer(otherArray){
                            return function(current){
                                return otherArray.filter(function(other){
                                    return other.code === current.type;
                                }).length == 0;
                            }
                        }
                        function comparer2(otherArray){
                            return function(current){
                                return otherArray.filter(function(other){
                                    return other.type === current.code;
                                }).length == 0;
                            }
                        }
                        let onlyInA = this.userInfo.prices.filter(comparer(response.data));
                        let onlyInB = response.data.filter(comparer2(this.userInfo.prices));

                        uniquePriceElements = onlyInA.concat(onlyInB);
                        for(let i = 0; i < uniquePriceElements.length; i++) {
                            if(!uniquePriceElements[i].hasOwnProperty('price')) {
                                uniquePriceElements[i].price = 0;
                                uniquePriceElements[i].type = uniquePriceElements[i].code;
                                delete uniquePriceElements[i].code;
                            }
                        }
                    }
                    for(let i = 0; i < this.userInfo.prices.length; i++) {
                        for(let k = 0; k < response.data.length; k++) {
                            if(this.userInfo.prices[i].type === response.data[k].code) {
                                this.priceType[i] = {
                                    type: response.data[k].code,
                                    title: response.data[k].title,
                                    id: this.userInfo.prices[i].id,
                                    price: this.userInfo.prices[i].price
                                };
                            }
                        }
                        if( this.userInfo.prices[i].price === 0) {
                            this.pricesPassed = false;
                        }
                    }

                    this.userInfo.prices = this.priceType.concat(uniquePriceElements);

                    this.showSaveButton = false;
                });
            },
            getUserAlbums() {
                this.$axios({
                    method: 'get',
                    url: `/api/vendor/${this.$store.state.auth.user.id}/albums/`,
                }).then((response) => {
                    this.userAlbums = response.data;
                    this.checkAlbumsFilled();
                });
            },
            getVendorPosts() {
                axios({
                    method: 'get',
                    url: `/api/vendor/${this.userInfo.id}/posts/`,
                }).then((response) => {
                    this.vendorPosts = response.data;
                });
            },
            getAvailableDates() {
                axios({
                    method: 'get',
                    url: `/api/vendor/offers/available?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                }).then((response) => {
                    this.availableHotDates = response.data;
                });
            },
            getVendorGallery() {
                axios({
                    method: 'get',
                    url: `/api/photos?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                }).then((response) => {
                    this.galleryItems = response.data;
                });
            },
            checkFromTenderBanner() {
                this.$router.push({name: 'cabinet-tenders', path: '/cabinet/tenders/',
                    params: {
                        showPopup: true
                    }})
            }

        },
        beforeCreate() {
            this.currentCity = this.$store.state.cityList.find((el) => {
                return el.id === this.$store.state.auth.user.cities[0];
            });
        },
        created() {


            if(this.$route.params.hasOwnProperty('tab')) {
                this.openedTab = this.$route.params.tab;
            }
            const today = new Date();
            const year = today.getFullYear();

            for (let i = 0; i < 100; i++) {
                this.years.push(year - i);
            }

            if(this.$auth.loggedIn) {

                let interlocutor = JSON.parse(localStorage.getItem('openChat'));
                if(window) {
                    if (window.localStorage.getItem('showTenderTab')) {
                        this.checkFromTenderBanner();
                        window.localStorage.removeItem('showTenderTab');
                    }
                    if (interlocutor) {
                        if (interlocutor.hasOwnProperty('id')) {
                            this.startDialog(interlocutor);
                            window.localStorage.removeItem('openChat');
                        }
                    }
                }


                // check that user saw the popup with progress information
                if(this.userInfo.saw_progress_popup) {
                    this.progressDetailShow = false;
                }

                if(!this.userInfo.saw_progress_popup && this.userProgress === 100) {
                    this.showProgressNotification = true;
                }

                // check that user saw the popup with calendar usage tips
                if(this.userInfo.saw_calendar_popup) {
                    this.showTip = false;
                }
                Object.assign(this.oldUserInfo, this.userInfo);
                this.userDescription = this.$store.state.auth.user.description;
                this.userProgress = this.$store.state.auth.user.progress;
                this.getVendorPrices();
                this.getAvailableDates();
                this.getVendorGallery();
                this.getVendorVideos();
                this.getCities();
                this.getUserAlbums();
                this.previewItems = this.previewItemsMerged;
                if(this.$store.state.auth.user.birthday) {
                    if (this.$store.state.auth.user.birthday.length > 0) {
                        const date = this.$store.state.auth.user.birthday
                        const dateSplited = date.split('-');
                        let day = dateSplited[2];
                        let month = dateSplited[1];
                        let year = dateSplited[0];
                        day = day.replace(/^0+/i, '');
                        month = month.replace(/^0+/i, '');
                        this.date.day = day;
                        this.date.month = this.months[month - 1];
                        this.date.year = year;
                    }
                }
                const token = this.$auth.$storage['_state']['_token.local'].split(' ')[1];
                this.profilePicOptions.url = `/api/users?token=${token}`;
                this.dropPostOptions.url = `/api/posts/photo?token=${token}`;
                this.profilePic = this.$store.state.auth.user.profile_pic;
                this.userPic = this.$store.state.auth.user.avatar;
                this.type = this.$store.state.auth.user.type;

                this.getVendorDates(token);
                if(this.type !== 'usual') {
                    this.getVendorProperties(token);
                }
                this.getVendorPosts();
            } else {
                this.$router.push('/login/');
            }

        },
        mounted() {
            if(this.$refs.vendorTabs) {
                const selectedTab = this.$refs.vendorTabs.querySelector('input:checked + label');

                this.$refs.vendorTabs.scrollLeft = selectedTab.offsetLeft - 20;
            }
            // if(this.$store.state.profileCity.hasOwnProperty('id')) {


            // }

        },
        updated() {
            if(this.$auth.loggedIn) {
                // this.currentCity = this.$store.state.profileCity;
                if (!this.userInfo.saw_progress_popup && this.userProgress === 100) {
                    this.showProgressNotification = true;

                }
            }

            const bodyClassList = document.querySelector('body').classList;
            if(this.showGallery  ||
                this.showHotEvents ||
                this.showSocial ||
                this.showDescription ||
                this.showNotifications ||
                this.showVideoGallery ||
                this.showChangePassword) {
                bodyClassList.add('no-scroll');
            } else {
                bodyClassList.remove('no-scroll');
            }
            if(this.openPostPopup ||
                this.openEditPostPopup) {

            }
        }
    }

</script>