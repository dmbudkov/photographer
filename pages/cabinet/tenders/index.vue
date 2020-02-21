<template>
    <div class="wrapper cabinet-page">
    <div v-if="userInfo" class="page-wrapper">
        <page-header class="page-header--cabinet-page"></page-header>
        <div v-if="showCreationPopup || showEditionPopup" @click="showEditionPopup = false;" class="popup-overlay"></div>
        <div class="tab-tip tab-tip--tenders" style="display: none;">
            <div class="tab-tip__inner">
                <div class="tab-tip__arrow"></div>
                <div class="tab-tip__text">
                    Чтобы начать поиск исполнителей, нажмите “создать тендер”
                    и заполните форму</div>
                <div class="tab-tip__focus"><span class="tab-tip__focus-text">Создать тендер</span><i class="tab-tip__focus-icon"></i></div>
                <!--<div class="tab-tip__button button button&#45;&#45;violet" @click="showHotEvents = true;">Подробнее</div>-->
            </div>
        </div>
    <transition name="fade">
        <create-tender
                v-if="showCreationPopup"
                :cityList="$store.state.cityList"
                @tenderCreation="handleTenderCreation($event)"
                :date="{years: genFutureYears(), months: months}"
                :specialities="$store.state.specialities"
        >
        </create-tender>
    </transition>
        <transition name="fade">
            <edit-tender
                    v-if="showEditionPopup"
                    :tenderInfo="tenderEditingInfo"
                    :cityList="$store.state.cityList"
                    @tenderEdition="handleTenderEdition($event)"
                    :date="{years: genFutureYears(), months: months}"
                    :specialities="$store.state.specialities"
            ></edit-tender>
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
            <ul class="vendor-type vendor-type--cabinet vendor-type--in-tabs" ref="vendorTabs" v-if="userInfo.type === 'vendor'">
                <!--<li class="vendor-type__item">-->
                <!--<input name="vendor-type" id="tab1" class="vendor-type__input" v-model="openedTab" value="tab1" type="radio"/>-->
                <!--<label for="tab1" class="vendor-type__label">-->
                <!--Мои сообщения-->
                <!--</label>-->
                <!--</li>-->
                <li class="vendor-type__item">
                    <nuxt-link to="/cabinet/chat/" class="vendor-type__label">Мои сообщения</nuxt-link>
                    <span class="vendor-type__item--event" v-show="hasUnread"></span>
                </li>
                <li class="vendor-type__item">
                    <nuxt-link :to="{name:'cabinet', path: '/cabinet/', params: {tab: 'tab3'}}" class="vendor-type__label">Профиль</nuxt-link>
                </li>
                <li class="vendor-type__item">
                    <nuxt-link :to="{name:'cabinet', path: '/cabinet/', params: {tab: 'tab1'}}" class="vendor-type__label">Лента событий</nuxt-link>
                </li>
                <li class="vendor-type__item">
                    <nuxt-link :to="{name:'cabinet', path: '/cabinet/', params: {tab: 'tab2'}}" class="vendor-type__label">Мой календарь</nuxt-link>
                </li>
                <li class="vendor-type__item">
                    <nuxt-link to="/cabinet/tenders/" class="vendor-type__label vendor-type__label--current">Мои тендеры</nuxt-link>
                </li>
                <!--<li class="vendor-type__item">-->
                <!--<input name="vendor-type" id="tab4" class="vendor-type__input" v-model="openedTab" value="tab4" type="radio"/>-->
                <!--<label for="tab4" class="vendor-type__label">-->
                <!--Настройки-->
                <!--</label>-->
                <!--</li>-->
            </ul>
            <ul class="vendor-type vendor-type--cabinet vendor-type--in-tabs" v-else ref="vendorTabs">
                <li class="vendor-type__item">
                    <nuxt-link to="/cabinet/chat/" class="vendor-type__label">Мои сообщения</nuxt-link>
                    <span class="vendor-type__item--event" v-show="hasUnread"></span>
                </li>
                <li class="vendor-type__item">

                    <nuxt-link :to="{name:'cabinet', path: '/cabinet/', params: {tab: 'tab1'}}" class="vendor-type__label"> Быстрый подбор</nuxt-link>
                    <!--<input name="vendor-type" id="tab1" class="vendor-type__input" v-model="openedTab" value="tab1" type="radio"/>-->
                    <!--<label for="tab1" class="vendor-type__label">-->
                        <!--Быстрый подбор-->
                    <!--</label>-->
                </li>
                <!--<li class="vendor-type__item">-->
                <!--<input name="vendor-type" id="tab2" class="vendor-type__input" v-model="openedTab" value="tab2" type="radio"/>-->
                <!--<label for="tab2" class="vendor-type__label">-->
                <!--Мои сообщения-->
                <!--</label>-->
                <!--</li>-->
                <!--<li class="vendor-type__item">-->
                    <!--<nuxt-link :to="{name:'cabinet', path: '/cabinet/', params: {tab: 'tab3'}}" class="vendor-type__label"> Мои события</nuxt-link>-->
                    <!--&lt;!&ndash;<input name="vendor-type" id="tab3" class="vendor-type__input" v-model="openedTab" value="tab3" type="radio"/>&ndash;&gt;-->
                    <!--&lt;!&ndash;<label for="tab3" class="vendor-type__label">&ndash;&gt;-->
                        <!--&lt;!&ndash;Мои события&ndash;&gt;-->
                    <!--&lt;!&ndash;</label>&ndash;&gt;-->
                <!--</li>-->
                <li class="vendor-type__item">
                    <nuxt-link :to="{name:'cabinet', path: '/cabinet/', params: {tab: 'tab4'}}" class="vendor-type__label">  Профиль</nuxt-link>
                    <!--<input name="vendor-type" id="tab4" class="vendor-type__input" v-model="openedTab" value="tab4" type="radio"/>-->
                    <!--<label for="tab4" class="vendor-type__label">-->
                        <!--Профиль-->
                    <!--</label>-->
                </li>
                <li class="vendor-type__item">
                    <nuxt-link to="/cabinet/tenders/" class="vendor-type__label vendor-type__label--current">Мои тендеры</nuxt-link>
                </li>
                <!--<li class="vendor-type__item">-->
                <!--<input name="vendor-type" id="tab5" class="vendor-type__input" v-model="openedTab" value="tab5" type="radio"/>-->
                <!--<label for="tab5" class="vendor-type__label">-->
                <!--Настройки-->
                <!--</label>-->
                <!--</li>-->
            </ul>
            <div class="tab-block tab-block--tenders">
                <!--vendor-tenders-->
                <div class="tab-block__item">
                    <div class="tenders">
                        <div class="tenders__tabs-holder">
                            <div class="tenders__tabs-item vendor-type vendor-type--tenders" :class="{'vendor-type--tenders-opened': showSelector}" ref="tenderTabs" @click="openSelect">
                                <div class="vendor-type__selected">
                                    <span class="vendor-type__text" v-text="selectedText"></span> <i class="vendor-type__text-icon"></i></div>
                                <ul class="vendor-type__list">
                                    <li class="vendor-type__item" v-for="(tab, index) in typeTabs">
                                        <input name="vendor-type" :id="tab.id" class="vendor-type__input" @change="getTab($event)" key="index"
                                               v-model="openedTenderTab" :value="tab.id" :data-label="tab.label" type="radio"/>
                                        <label :for="tab.id" class="vendor-type__label" v-text="tab.label">

                                        </label>
                                    </li>

                                </ul>
                            </div>
                            <div class="tenders__tabs-item tenders__create" @click="showCreationPopup = true;">
                                <span class="tenders__create-text">Создать тендер</span>
                                <i class="tenders__create-icon"></i>
                            </div>
                        </div>
                        <div class="tenders__items" v-if="openedTenderTab === 'myTenders'">
                            <p class="tenders__description" v-if="!myTenders.length">Здесь будет отображен список организованных Вами тендеров</p>
                            <!-- for new tenders tender&#45;&#45;new-->
                            <!-- for finished tenders tender&#45;&#45;finished-->

                            <div v-else class="tenders__item tender" :class="{'tender--finished': tender.closed}" v-for="(tender, index) in myTenders" :key="index">
                                <div class="tender__top">
                                    <div class="tender__edit settings settings--tender" @click="showBubble(tender.id)">
                                        <div class="settings__dot"></div>
                                        <div class="settings__dot"></div>
                                        <div class="settings__dot"></div>
                                        <div class="tender__edit-bubble bubble" :ref="`bubble${tender.id}`">
                                            <ul class="bubble__list">
                                                <li class="bubble__item" @click="editTender($event, tender)">Редактировать</li>
                                                <li class="bubble__item" @click="updateTender($event, tender.id)">Завершить</li>
                                                <li class="bubble__item bubble__item--red" @click="deleteTender($event, tender.id)">Удалить</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <time class="tender__date" v-text="prettifyCreateDate(tender.created_at)">1 мая в 19:00</time>
                                    <nuxt-link :to="{path: `/cabinet/tenders/${tender.id}?type=my`}" class="tender__name" v-text="tender.name">Фотограф на свадьбу, ни разу не дешево</nuxt-link></div>
                                <nuxt-link :to="{path: `/cabinet/tenders/${tender.id}?type=my`}"  class="tender__info">
                                    <div class="tender__info-item info-item info-item--violet">
                                        <div class="info-item__title">бюджет</div>
                                        <div class="info-item__text">{{prettifyPrice(tender.sum)}} ₽</div>
                                    </div>
                                    <div class="tender__info-item info-item">
                                        <div class="info-item__title">город</div>
                                        <div class="info-item__text" v-text="tender.city.title"></div>
                                    </div>
                                    <div class="tender__info-item info-item">
                                        <div class="info-item__title">истекает</div>
                                        <time class="info-item__text" v-if="!tender.closed" v-text="prettifyDate(tender.finishDate)">29 сентября</time>
                                        <span v-else class="info-item__text">Завершен</span>
                                    </div>
                                    <div class="tender__info-item info-item">
                                        <div class="info-item__title">дата события</div>
                                        <time class="info-item__text" v-text="prettifyDate(tender.eventDate)">29 сентября</time>
                                    </div>

                                    <div class="tender__info-count" v-text="tender.respond.length">33</div>
                                </nuxt-link>
                                <nuxt-link :to="{path: `/cabinet/tenders/${tender.id}?type=my`}" class="tender__description" v-text="tender.comment"></nuxt-link>

                            </div>
                        </div>
                        <div class="tenders__items" v-else-if="openedTenderTab === 'new'" >
                            <p class="tenders__description" v-if="!allTenders.length">Здесь будет отображен список тендеров, организованных другими пользователями</p>
                            <!-- for new tenders tender&#45;&#45;new-->
                            <!-- for finished tenders tender&#45;&#45;finished-->

                            <div v-else class="tenders__item tender" :class="{'tender--finished': tender.closed}" v-for="(tender, index) in allTenders" :key="index" @click="sawNew($event, tender.id, tender.saw)">
                                <div class="tender__top">
                                    <time class="tender__date" v-text="prettifyCreateDate(tender.created_at)">1 мая в 19:00</time>
                                    <nuxt-link :to="{path: `/cabinet/tenders/${tender.id}`}" class="tender__name" v-text="tender.name">Фотограф на свадьбу, ни разу не дешево</nuxt-link></div>
                                <nuxt-link :to="{path: `/cabinet/tenders/${tender.id}`}"   class="tender__info">
                                    <div class="tender__info-item info-item info-item--violet">
                                        <div class="info-item__title">бюджет</div>
                                        <div class="info-item__text">{{prettifyPrice(tender.sum)}} ₽</div>
                                    </div>
                                    <div class="tender__info-item info-item">
                                        <div class="info-item__title">город</div>
                                        <div class="info-item__text" v-text="tender.city.title">Комсомольск-на-Амуре</div>
                                    </div>
                                    <div class="tender__info-item info-item">
                                        <div class="info-item__title">истекает</div>
                                        <time v-if="!tender.closed" class="info-item__text" v-text="prettifyDate(tender.finishDate)">29 сентября</time>
                                        <span v-else class="info-item__text">Завершен</span>
                                    </div>
                                    <div class="tender__info-item info-item">
                                        <div class="info-item__title">дата события</div>
                                        <time class="info-item__text" v-text="prettifyDate(tender.eventDate)">29 сентября</time>
                                    </div>

                                    <div class="tender__info-count" v-if="tender.respond" v-text="tender.respond"></div>
                                </nuxt-link>
                                <nuxt-link :to="{path: `/cabinet/tenders/${tender.id}`}"  class="tender__description" v-text="tender.comment"></nuxt-link>

                            </div>
                        </div>
                        <div class="tenders__items" v-else-if="openedTenderTab === 'saw' && sawTenderList">
                            <p class="tenders__description" v-if="!sawTenderList.length">Здесь будут отображены просмотренные тендеры</p>
                            <!-- for new tenders tender&#45;&#45;new-->
                            <!-- for finished tenders tender&#45;&#45;finished-->

                            <div v-else class="tenders__item tender" :class="{'tender--finished': tender.closed}" v-for="(tender, index) in sawTenderList" :key="index">
                                <div class="tender__top">
                                    <time class="tender__date" v-text="prettifyCreateDate(tender.created_at)">1 мая в 19:00</time>
                                    <nuxt-link :to="{path: `/cabinet/tenders/${tender.id}`}" class="tender__name" v-text="tender.name">Фотограф на свадьбу, ни разу не дешево</nuxt-link></div>
                                <nuxt-link :to="{path: `/cabinet/tenders/${tender.id}`}"   class="tender__info">
                                    <div class="tender__info-item info-item info-item--violet">
                                        <div class="info-item__title">бюджет</div>
                                        <div class="info-item__text">{{prettifyPrice(tender.sum)}} ₽</div>
                                    </div>
                                    <div class="tender__info-item info-item">
                                        <div class="info-item__title">город</div>
                                        <div class="info-item__text" v-text="tender.city.title">Комсомольск-на-Амуре</div>
                                    </div>
                                    <div class="tender__info-item info-item">
                                        <div class="info-item__title">истекает</div>
                                        <time v-if="!tender.closed" class="info-item__text" v-text="prettifyDate(tender.finishDate)">29 сентября</time>
                                        <span v-else class="info-item__text">Завершен</span>
                                    </div>
                                    <div class="tender__info-item info-item">
                                        <div class="info-item__title">дата события</div>
                                        <time class="info-item__text" v-text="prettifyDate(tender.eventDate)">29 сентября</time>
                                    </div>

                                    <div class="tender__info-count" v-if="tender.respond" v-text="tender.respond"></div>
                                </nuxt-link>
                                <nuxt-link :to="{path: `/cabinet/tenders/${tender.id}`}"  class="tender__description" v-text="tender.comment"></nuxt-link>

                            </div>
                        </div>
                        <div class="tenders__items" v-else-if="openedTenderTab === 'participate'">
                            <p class="tenders__description" v-if="!participTenderList.length">Здесь будут отображены тендеры, в которых вы приняли участие</p>
                            <!-- for new tenders tender&#45;&#45;new-->
                            <!-- for finished tenders tender&#45;&#45;finished-->

                            <div v-else class="tenders__item tender" :class="{'tender--finished': tender.closed}" v-for="(tender, index) in participTenderList" :key="index">
                                <div class="tender__top">
                                    <time class="tender__date" v-text="prettifyCreateDate(tender.created_at)">1 мая в 19:00</time>
                                    <nuxt-link :to="{path: `/cabinet/tenders/${tender.id}`}" class="tender__name" v-text="tender.name">Фотограф на свадьбу, ни разу не дешево</nuxt-link></div>
                                <nuxt-link :to="{path: `/cabinet/tenders/${tender.id}`}"   class="tender__info">
                                    <div class="tender__info-item info-item info-item--violet">
                                        <div class="info-item__title">бюджет</div>
                                        <div class="info-item__text">{{prettifyPrice(tender.sum)}} ₽</div>
                                    </div>
                                    <div class="tender__info-item info-item">
                                        <div class="info-item__title">город</div>
                                        <div class="info-item__text" v-text="tender.city.title">Комсомольск-на-Амуре</div>
                                    </div>
                                    <div class="tender__info-item info-item">
                                        <div class="info-item__title">истекает</div>
                                        <time v-if="!tender.closed" class="info-item__text" v-text="prettifyDate(tender.finishDate)">29 сентября</time>
                                        <span v-else class="info-item__text">Завершен</span>
                                    </div>
                                    <div class="tender__info-item info-item">
                                        <div class="info-item__title">дата события</div>
                                        <time class="info-item__text" v-text="prettifyDate(tender.eventDate)">29 сентября</time>
                                    </div>

                                    <div class="tender__info-count" v-if="tender.respond" v-text="tender.respond"></div>
                                </nuxt-link>
                                <nuxt-link :to="{path: `/cabinet/tenders/${tender.id}`}"  class="tender__description" v-text="tender.comment"></nuxt-link>

                            </div>
                        </div>
                        <div class="tenders__items" v-else-if="openedTenderTab === 'paid'">
                            <p class="tenders__description" v-if="!paidTenderList.length">Здесь будут отображены оплаченные тендеры в которых вы можете принять участие</p>
                            <!-- for new tenders tender&#45;&#45;new-->
                            <!-- for finished tenders tender&#45;&#45;finished-->

                            <div v-else class="tenders__item tender" v-for="(tender, index) in paidTenderList" :key="index">
                                <div class="tender__top">
                                    <time class="tender__date" v-text="prettifyCreateDate(tender.created_at)">1 мая в 19:00</time>
                                    <nuxt-link :to="{path: `/cabinet/tenders/${tender.id}`}" class="tender__name" v-text="tender.name">Фотограф на свадьбу, ни разу не дешево</nuxt-link></div>
                                <nuxt-link :to="{path: `/cabinet/tenders/${tender.id}`}"   class="tender__info">
                                    <div class="tender__info-item info-item info-item--violet">
                                        <div class="info-item__title">бюджет</div>
                                        <div class="info-item__text">{{prettifyPrice(tender.sum)}} ₽</div>
                                    </div>
                                    <div class="tender__info-item info-item">
                                        <div class="info-item__title">город</div>
                                        <div class="info-item__text" v-text="tender.city.title">Комсомольск-на-Амуре</div>
                                    </div>
                                    <div class="tender__info-item info-item">
                                        <div class="info-item__title">истекает</div>
                                        <time class="info-item__text" v-text="prettifyDate(tender.finishDate)">29 сентября</time>
                                    </div>
                                    <div class="tender__info-item info-item">
                                        <div class="info-item__title">дата события</div>
                                        <time class="info-item__text" v-text="prettifyDate(tender.eventDate)">29 сентября</time>
                                    </div>

                                    <div class="tender__info-count" v-if="tender.respond" v-text="tender.respond"></div>
                                </nuxt-link>
                                <nuxt-link :to="{path: `/cabinet/tenders/${tender.id}`}"  class="tender__description" v-text="tender.comment"></nuxt-link>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </main>
    </div>
        <page-footer></page-footer>
    </div>
</template>

<script>
    // import vue2Dropzone from 'vue2-dropzone';
    import PageHeader from '~/components/PageHeader/PageHeaderCabinet.vue';
    import CreateTender from '~/components/Cabinet/Common/Tenders/CreateTender.vue';
    import EditTender from '~/components/Cabinet/Common/Tenders/EditTender.vue';
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
    import PageFooter from '~/components/PageFooter.vue';
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
        "create-tender": CreateTender,
        "edit-tender": EditTender,
        'page-footer': PageFooter,
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
        name: 'Tenders',
        auth: true,
        components,
        asyncData({ params, error, store, query, app, redirect }) {
            if(!store.state.auth.loggedIn) {
                redirect('302', '/login/');
            }
        },
        data() {
            return {
                openedTab: 'tab3',
                openedTenderTab: '',
                showCreationPopup: false,
                showEditionPopup: false,
                tenderEditingInfo: {},
                tabs: [
                    {id: 'new', label: 'Все тендеры', type: ['vendor']},
                    {id: 'saw', label: 'Просмотренные', type: ['vendor']},
                    // {id: 'paid', label: 'Оплаченные'},
                    {id: 'participate', label: 'Участвую', type: ['vendor']},
                    {id: 'myTenders', label: ' Мои тендеры', type: ['vendor', 'client']},
                ],
                selectedText: "",
                months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
                    "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
                showSelector: false,
                myTenders: [],
                allTenders: [],
                // user info
            }
        },
        watch: {
            openedTenderTab: function (newVal) {
                if(!newVal) {
                    this.openedTenderTab = this.typeTabs[0].id;
                    this.selectedText = this.typeTabs[0].label;
                } else {
                    switch (newVal) {
                        case 'myTenders':
                            this.getMyTenders();

                    }
                }
            },
            myTenders: function (newVal, oldVal) {
                
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
            typeTabs: function () {
              return this.tabs.filter((el) => {
                return el.type.indexOf(this.userInfo.type) + 1;
              })
            },
            sawTenderList: function () {
                return this.allTenders.filter(function (el) {
                    return el.saw;
                })
            },
            participTenderList: function () {
                return this.allTenders.filter(function (el) {
                    return el.participation;
                })
            },
            paidTenderList: function () {
                return this.allTenders.filter(function (el) {
                    return el.paid;
                })
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
        methods: {
            sawNew(event, id, saw) {
                if(!saw) {
                    this.$axios({
                        method: 'post',
                        url: `/api/tenders/${id}/saw?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,

                    });
                }
            },
            getMyTenders() {

                this.$axios({
                    method: 'get',
                    url: `/api/tenders/my?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`
                }).then((response) => {
                    this.myTenders = response.data;
                })
            },
            deleteTender(event, id) {
                this.$axios({
                    method: 'delete',
                    url: `/api/tenders/${id}?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`
                }).then((response) => {
                    this.getMyTenders();
                })
            },
            updateTender(event, id) {
                this.$axios({
                    method: 'patch',
                    url: `/api/tenders/${id}?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: {
                        closed: true
                    }
                }).then((response) => {
                    this.getMyTenders();
                })
            },
            getAllTenders(time = 0) {
                let getUrl = `/api/tenders?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`;
                if(time > 0) {
                    getUrl = `/api/tenders?time=${time}&token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`;
                }
                this.$axios({
                    method: 'get',
                    url: getUrl
                }).then((response) => {
                    this.allTenders = response.data;
                })
            },
            genFutureYears() {
                const today = new Date();
                const year = today.getFullYear();
                const years = [];
                // const futureYears = new Date().setFullYear(year + 2).getFullYear(); // plus 2 years

                for (let i = 0; i < 5; i++) {
                    years.push(year + i);
                }
                return years;
            },
            prettifyPrice(price) {
                let value = price.toString().replace(/[^\d]/, '');
                let dirtyVal = value.replace(/ /g,'');
                let val = (+dirtyVal/1).toFixed(0).replace('.', ' ');
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            },
            prettifyCreateDate(date) {
                let correctDate = date;
                if(typeof date === "string") {
                    if (date.indexOf('.') > -1) {
                        correctDate = correctDate.replace(/[.]/g, '-');
                    }
                    correctDate = correctDate.split(" ").join("T");
                    correctDate = correctDate + "Z";
                }
                let resultDate = new Date(correctDate);

                let options = {
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                };
                resultDate = resultDate.toLocaleDateString('ru', options);

                resultDate = resultDate.replace(/[,]/g, '');
                resultDate = resultDate.split(' ');
                return `${resultDate[0]} ${resultDate[1]} в ${resultDate[2]}`;
            },
            prettifyDate(date) {
                let correctDate = date;
                if(typeof date === "string") {
                    if (date.indexOf('.') > -1) {
                        correctDate = correctDate.replace(/[.]/g, '-');
                    }
                }

                let resultDate = new Date(correctDate);

                let options = {
                    month: 'long',
                    day: 'numeric',
                };
                resultDate = resultDate.toLocaleDateString('ru', options);
                resultDate = resultDate.split(' ');
                const month = resultDate[1];
                resultDate[1] = month;
                resultDate = resultDate.join(' ');
                return resultDate;
            },
            editTender(event, tenderInfo) {
                this.tenderEditingInfo = tenderInfo;
                this.showEditionPopup = true;
            },
            handleTenderCreation(data) {
                this.showCreationPopup = data;
                this.getMyTenders();
            },
            handleTenderEdition(data) {
                this.showEditionPopup = data;
            },
            getTab(event) {
                this.selectedText = event.target.dataset.label;
                this.openSelect();
            },
            openSelect() {
                if(this.showSelector) {
                    this.showSelector = false;
                } else {
                    this.showSelector = true;
                }
            },
            showBubble(id) {
                const bubble = this.$refs[`bubble${id}`];
                bubble[0].classList.toggle('bubble--opened');
            },

            clickBeyond(event) {
                if(event.target !== this.$refs.cabinetMenu) {
                    this.$emit('showCabinetMenu', {
                        showCabinetMenu: false
                    })
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
        },
        // beforeMount() {
        //     if(this.$store.state.auth.user.type === 'client') {
        //         this.tabs = [
        //             {id: 'myTenders', label: ' Мои тендеры'}
        //         ]
        //     } else {
        //         this.tabs = [
        //             {id: 'new', label: 'Новые'},
        //             {id: 'saw', label: 'Просмотренные'},
        //             // {id: 'paid', label: 'Оплаченные'},
        //             {id: 'participate', label: 'Участвую'},
        //             {id: 'myTenders', label: ' Мои тендеры'},
        //         ]
        //     }
        // },
        created() {
            if (this.$route.params.hasOwnProperty('tab')) {
                this.openedTab = this.$route.params.tab;
            }
            this.openedTenderTab = this.typeTabs[0].id;
            this.selectedText = this.typeTabs[0].label;
            this.getAllTenders();
            setTimeout(() => {
                setInterval(() => {
                     this.getAllTenders(5*60*1000);
                }, 5*60*1000);
            }, 5000)
        },
        mounted() {
            if (this.$route.params.hasOwnProperty('showPopup')) {
                setTimeout(() => {
                    this.showCreationPopup = true;
                }, 1000)
            }
        }
        // mounted() {
        //
        // }
        // updated() {
        //     if(this.userInfo.type === 'client') {
        //         this.tabs = [
        //             {id: 'myTenders', label: ' Мои тендеры'}
        //         ]
        //     } else {
        //         this.tabs = [
        //             {id: 'new', label: 'Новые'},
        //             {id: 'saw', label: 'Просмотренные'},
        //             // {id: 'paid', label: 'Оплаченные'},
        //             {id: 'participate', label: 'Участвую'},
        //             {id: 'myTenders', label: ' Мои тендеры'},
        //         ]
        //     }
        //     this.openedTenderTab = this.tabs[0].id;
        //     this.selectedText = this.tabs[0].label;
        // },

    }

</script>