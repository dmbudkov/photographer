<template>
    <div v-if="userInfo" class="page-wrapper cabinet-page" >
        <div v-if="showRespondPopup || showEditionPopup" @click="showRespondPopup = false; showEditionPopup = false;" class="popup-overlay"></div>
        <respond-popup v-if="showRespondPopup" @showPopup="handlePopupShow($event)"></respond-popup>
        <page-header class="page-header--tender-detail page-header--cabinet-page"></page-header>
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
            <ul class="vendor-type vendor-type--tender-detail vendor-type--cabinet vendor-type--in-tabs" v-if="userInfo.type === 'vendor'" ref="vendorTabs">
                <!--<li class="vendor-type__item">-->
                <!--<input name="vendor-type" id="tab1" class="vendor-type__input" v-model="openedTab" value="tab1" type="radio"/>-->
                <!--<label for="tab1" class="vendor-type__label">-->
                <!--Мои сообщения-->
                <!--</label>-->
                <!--</li>-->
                <li class="vendor-type__item">
                <nuxt-link to="/cabinet/chat/" class="vendor-type__label">Мои сообщения</nuxt-link>
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
            <div class="tab-block tab-block--cabinet">
                <!--vendor-tenders-->
                <div class="tab-block__item">
                    <div class="tenders tenders--detail">
                        <div class="tenders__items">
                            <!-- for new tenders tender&#45;&#45;new-->
                            <!-- for finished tenders tender&#45;&#45;finished-->

                            <div v-if="$route.query.type === 'my'" class="tenders__item tender tender--detail">

                                <div class="tender__top" :class="{'tender__top--violet': $route.query.type === 'my'}">
                                    <div class="tender__top-navbar" v-if="$route.query.type === 'my'">
                                        <nuxt-link to="/cabinet/tenders/" class="tender__top-back back"></nuxt-link>
                                        <div class="tender__top-title">Тендер</div>
                                        <div class="tender__top-options settings"  @click="showBubble(1)">
                                            <div class="settings__dot"></div>
                                            <div class="settings__dot"></div>
                                            <div class="settings__dot"></div>
                                            <div class="tender__edit-bubble bubble" :ref="`bubble1`">
                                                <ul class="bubble__list" >
                                                    <li class="bubble__item"  v-if="!tenderData.closed" @click="editTender($event, tenderData)">Редактировать</li>
                                                    <li class="bubble__item" v-if="!tenderData.closed" @click="updateTender($event, $route.params.id)">Завершить</li>
                                                    <li class="bubble__item bubble__item--red" @click="deleteTender($event, $route.params.id)">Удалить</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <nuxt-link v-if="$route.query.type !== 'my'" to="/cabinet/tenders/" class="tender__delete"></nuxt-link>
                                    <time class="tender__date" v-text="prettifyCreateDate(tenderData.created_at)">1 мая в 19:00</time>
                                    <h5 class="tender__name" v-text="tenderData.name">Фотограф на свадьбу, ни разу не дешево</h5>
                                </div>
                                <section class="tender__info">
                                    <div class="tender__info-item info-item info-item--violet">
                                        <div class="info-item__title">бюджет</div>
                                        <div class="info-item__text">{{prettifyPrice(tenderData.sum)}} ₽</div>
                                    </div>
                                    <div class="tender__info-item info-item">
                                        <div class="info-item__title">город</div>
                                        <div class="info-item__text" v-text="tenderData.city.title">Комсомольск-на-Амуре</div>
                                    </div>
                                    <div class="tender__info-item info-item">
                                        <div class="info-item__title">истекает</div>
                                        <time v-if="!tenderData.closed" class="info-item__text" v-text="prettifyDate(tenderData.finishDate)">29 сентября</time>
                                        <span v-else class="info-item__text">Завершен</span>
                                    </div>
                                    <div class="tender__info-item info-item">
                                        <div class="info-item__title">дата события</div>
                                        <time class="info-item__text" v-text="prettifyDate(tenderData.eventDate)">29 сентября</time>
                                    </div>
                                    <div class="tender__info-count" v-text="tenderData.respond.length"></div>
                                </section>
                                <div class="tender__card vendor-card vendor-card--tender">
                                    <div class="vendor-card__image">

                                    </div>
                                    <div class="vendor-card__descr" v-if="$route.query.type === 'my'">
                                        <div class="vendor-card__name" v-text="`${userInfo.firstName} ${userInfo.lastName}`"></div>
                                        <div class="vendor-card__role">
                                            заказчик
                                        </div>
                                    </div>

                                </div>

                                <div class="tender__description">
                                    <p>{{tenderData.comment}}</p></div>


                                <!--responds-->
                                <div class="tender__responds" v-if="$route.query.type !== 'my' && userInfo.type === 'vendor'">
                                    <div class="tender__responds-delimiter">
                                        <div class="tender__responds-text">Ваш ответ:</div>
                                    </div>
                                    <form method="post" @submit.prevent="respond" class="tender__answer" >
                                        <div class="tender__area-holder"><label for="comment"
                                                                                class="tender__area-label">{{400 - comment.length}} символов</label>
                                            <textarea name="comment" id="comment" v-model="comment" maxlength="400"
                                                      placeholder="Опишите ваш подход к работе, укажите уникальные навыки или другую полезную информацию"
                                                      class="tender__area"></textarea></div>
                                        <button class="tender__button button--aqua">Откликнуться</button>
                                    </form>
                                </div>
                                <div v-else class="tender__responds">

                                    <div class="tender__responds-title">Откликнувшиеся исполнители:</div>

                                    <div class="tender__respond" v-for="(respond, index) in responds" :key="index">
                                        <time class="tender__respond-date" v-text="prettifyCreateDate(respond.created_at)">11 сентября в 11:23</time>
                                        <div class="tender__respond-card vendor-card vendor-card--tender vendor-card--respond">
                                            <div class="vendor-card__image" :style="{'background-image': `url(${respond.info.profile_pic})`}">

                                            </div>
                                            <div class="vendor-card__descr">
                                                <div class="vendor-card__holder">

                                                    <nuxt-link :to="{path: '/catalog/vendor/' + respond.info.id + '/'}" class="vendor-card__name" v-if="!respond.info.placename">{{respond.info.firstName}} {{respond.info.lastName}}</nuxt-link>
                                                    <nuxt-link :to="{path: '/catalog/vendor/' + respond.info.id + '/'}" class="vendor-card__name" v-else>{{respond.info.placename}}</nuxt-link>
                                                    <nuxt-link  :to="{path: '/catalog/vendor/' + respond.info.id + '/'}" class="vendor-card__prices" >
                                               <span class="vendor-card__price" v-for="priceItem in respond.info.prices" :key="priceItem.type">
                                <span v-if=" typeof respond.info['nearestHotDate'] === 'object' && respond.info['nearestHotDate'].type === priceItem.type" class="vendor-card__price-sum" v-text="prettifyPriceRespond(respond.info['nearestHotDate'].price)"></span>
                                <span v-else class="vendor-card__price-sum" v-text="prettifyPriceRespond(priceItem.price)"></span><span class="vendor-card__price-sum">₽</span>
                                <span class="vendor-card__price-delimiter"> / </span>
                                <span class="vendor-card__price-for" v-if="priceItem.type === 'full'">день</span>
                                <span class="vendor-card__price-for" v-if="priceItem.type === 'hour'">час</span>
                                <span class="vendor-card__price-for" v-if="priceItem.type === 'person'">за человека</span>
                                <span class="vendor-card__price-for" v-if="priceItem.type === 'event'">за выступление</span>
                                 <span v-if="typeof respond.info['nearestHotDate'] === 'object' && respond.info['nearestHotDate'].type === priceItem.type" class="vendor-card__price vendor-card__price--old">{{prettifyPriceRespond(priceItem.price)}} ₽</span>
                            </span>
                                                    </nuxt-link>
                                                </div>
                                                <span class="vendor-card__preview-holder" v-if="!respond.info.allPreviewsEmpty">
                                        <ul class="vendor-card__preview preview-items preview-items--card">
                                                <li class="preview-items__item" :class="[{'preview-items__item--photo': preview.type === 'photo'}, {'preview-items__item--video': preview.type === 'video'}, {'preview-items__item--empty': preview.type === 'empty'}]" v-for="(preview, previewIndex) in respond.info.previewItems" :key="previewIndex" :style="{'background-image': 'url(' + preview.preview + ')'}">
                                            <span class="preview-items__item-holder">
                                            <span class="preview-items__item-icon"></span>
                                            <span class="preview-items__item-text" v-if="preview.type === 'photo'">Фото</span>
                                            <span class="preview-items__item-text" v-else-if="preview.type === 'video'">Видео</span>
                                            <span class="preview-items__item-text" v-else>Фото/видео</span>
                                                </span>
                                        </li>
                                    </ul>
                                        </span>
                                            </div>
                                        </div>
                                        <div class="tender__respond-comment" v-text="respond.comment">

                                        </div>
                                        <div class="tender__respond-actions">
                                            <div class="tender__respond-action tender__respond-action--violet" @click="answerVendor(respond.info.id)">
                                                Ответить
                                            </div>
                                            <div class="tender__respond-action" @click="dismissVendor(respond.info.id, index)">
                                                Отклонить
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="tender__time" v-if="!tenderData.closed">До конца тендера {{finishCounter}} дня</div>
                            </div>
                            <div v-else class="tenders__item tender tender--detail">

                                <div class="tender__top">

                                    <nuxt-link to="/cabinet/tenders/" class="tender__delete"></nuxt-link>
                                    <time class="tender__date" v-text="prettifyCreateDate(tenderData.created_at)">1 мая в 19:00</time>
                                    <h5 class="tender__name" v-text="tenderData.name">Фотограф на свадьбу, ни разу не дешево</h5>
                                </div>
                                <section class="tender__info">
                                    <div class="tender__info-item info-item info-item--violet">
                                        <div class="info-item__title">бюджет</div>
                                        <div class="info-item__text">{{prettifyPrice(tenderData.sum)}} ₽</div>
                                    </div>
                                    <div class="tender__info-item info-item">
                                        <div class="info-item__title">город</div>
                                        <div class="info-item__text" v-text="tenderData.city.title">Комсомольск-на-Амуре</div>
                                    </div>
                                    <div class="tender__info-item info-item">
                                        <div class="info-item__title">истекает</div>
                                        <time v-if="!tenderData.closed" class="info-item__text" v-text="prettifyDate(tenderData.finishDate)">29 сентября</time>
                                        <span v-else class="info-item__text">Завершен</span>
                                    </div>
                                    <div class="tender__info-item info-item">
                                        <div class="info-item__title">дата события</div>
                                        <time class="info-item__text" v-text="prettifyDate(tenderData.eventDate)">29 сентября</time>
                                    </div>
                                    <div class="tender__info-count" v-text="tenderData.respond"></div>
                                </section>
                                <div class="tender__card vendor-card vendor-card--tender">
                                    <div v-if="tenderData.creatorInfo.profile_pic" class="vendor-card__image" :style="{'background-image': `url(${tenderData.creatorInfo.profile_pic})`}"></div>
                                    <div v-else class="vendor-card__image"></div>
                                    <div class="vendor-card__descr">
                                        <div class="vendor-card__name">{{tenderData.creatorInfo.firstName}} {{tenderData.creatorInfo.lastName}}</div>
                                        <div class="vendor-card__role">заказчик</div>
                                    </div>
                                </div>

                                <div class="tender__description">
                                    <p>{{tenderData.comment}}</p></div>


                                <!--responds-->
                                <div class="tender__responds" v-if="($route.query.type !== 'my' && !tenderData.participation) && userInfo.type === 'vendor' && fullProgress">
                                    <div class="tender__responds-delimiter" >
                                        <div class="tender__responds-text">Ваш ответ:1</div>
                                    </div>
                                    <form method="post" @submit.prevent="respond" class="tender__answer">
                                        <div class="tender__area-holder"><label for="comment"
                                                                                class="tender__area-label">{{400 - comment.length}}  символов</label>
                                            <textarea name="comment" id="comment" v-model="comment" maxlength="400"
                                                      placeholder="Опишите ваш подход к работе, укажите уникальные навыки или другую полезную информацию"
                                                      class="tender__area"></textarea></div>
                                        <button class="tender__button button--aqua">Откликнуться</button>
                                    </form>
                                </div>
                                <div class="tender__responds" v-if="tenderData.participation && userInfo.type === 'vendor'">
                                    <div class="tender__responds-delimiter" >
                                        <div class="tender__responds-text">Ваш ответ:</div>
                                    </div>
                                    <div class="tender__respond">
                                        <time class="tender__respond-date" v-text="prettifyCreateDate(tenderData.createdAtMy)">11 сентября в 11:23</time>
                                        <div class="tender__respond-card vendor-card vendor-card--tender vendor-card--respond">
                                            <div class="vendor-card__image" :style="{'background-image': `url(${userInfo.profile_pic})`}">

                                            </div>
                                            <div class="vendor-card__descr">
                                                <div class="vendor-card__holder">

                                                    <div class="vendor-card__name" v-if="!userInfo.placename">{{userInfo.firstName}} {{userInfo.lastName}}</div>
                                                    <div class="vendor-card__name" v-else>{{userInfo.placename}}</div>
                                                    <div class="vendor-card__prices" >
                                               <span class="vendor-card__price" v-for="priceItem in userInfo.prices" :key="priceItem.type">
                                <span class="vendor-card__price-sum"></span>
                                <span class="vendor-card__price-sum">{{priceItem.price}}₽</span>
                                <span class="vendor-card__price-delimiter"> / </span>
                                                   <span class="vendor-card__price-for" v-if="priceItem.type === 'full'">день</span><span class="vendor-card__price-for" v-if="priceItem.type === 'hour'">час</span><span class="vendor-card__price-for" v-if="priceItem.type === 'event'">выступление</span><span class="vendor-card__price-for" v-if="priceItem.type === 'person'">за человека</span>
                                <!--<span class="vendor-card__price-for" v-text="priceItem.title"></span>-->
                            </span>
                                                    </div>
                                                </div>
                                                <!--<span class="vendor-card__preview-holder" v-if="!respond.info.allPreviewsEmpty">-->
                                        <!--<ul class="vendor-card__preview preview-items preview-items&#45;&#45;card">-->
                                                <!--<li class="preview-items__item" :class="[{'preview-items__item&#45;&#45;photo': preview.type === 'photo'}, {'preview-items__item&#45;&#45;video': preview.type === 'video'}, {'preview-items__item&#45;&#45;empty': preview.type === 'empty'}]" v-for="(preview, previewIndex) in respond.info.previewItems" :key="previewIndex" :style="{'background-image': 'url(' + preview.preview + ')'}">-->
                                            <!--<span class="preview-items__item-holder">-->
                                            <!--<span class="preview-items__item-icon"></span>-->
                                            <!--<span class="preview-items__item-text" v-if="preview.type === 'photo'">Фото</span>-->
                                            <!--<span class="preview-items__item-text" v-else-if="preview.type === 'video'">Видео</span>-->
                                            <!--<span class="preview-items__item-text" v-else>Фото/видео</span>-->
                                                <!--</span>-->
                                        <!--</li>-->
                                    <!--</ul>-->
                                        <!--</span>-->
                                            </div>
                                        </div>
                                        <div class="tender__respond-comment" v-text="tenderData.commentMy">

                                        </div>
                                        <div class="tender__respond-actions">
                                            <!--<div class="tender__respond-action tender__respond-action&#45;&#45;violet">-->
                                                <!--Ответить-->
                                            <!--</div>-->
                                            <div class="tender__respond-action" @click="refuseTender($event, tenderData.id)">
                                                Отказаться от участия
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tender__time">До конца тендера {{finishCounter}} дня</div>
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
    import RespondPopup from '~/components/Cabinet/Common/Tenders/ParticipationTender.vue';
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
        "respond-popup": RespondPopup,
        "edit-tender": EditTender
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
        name: 'Tenders',
        auth: true,
        components,
        asyncData({ params, error, store, query, app, redirect }) {
            if (!store.state.auth.loggedIn) {
                redirect('302', '/login/');
            } else {
                try {
                    let tenderData = {};
                    if (query.type !== 'my') {

                        return app.$axios({
                            method: 'get',
                            url: `/api/tender/${+params.id}?token=${store.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                        }).then((response) => {
                            tenderData = response.data[0];
                            return {
                                tenderData: tenderData
                            };
                        })
                    } else {
                        return app.$axios({
                            method: 'get',
                            url: `/api/tender/my/${+params.id}?token=${store.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                        }).then((response) => {
                            tenderData = response.data[0];
                            let responds = response.data[0].respond.filter((el) => {
                                return el.answer;
                            });
                            for (let i = 0; i < responds.length; i++) {
                                let photosArray = responds[i].info.photos_in_list;
                                let videosArray = responds[i].info.videos_in_list;
                                let mergedArray = [];
                                let emptyValuesCount = 0;
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
                                            emptyValuesCount++;
                                            mergedArray[i] = {type: 'empty', preview: '', sort: i};
                                        }
                                    }
                                }
                                if (emptyValuesCount > 2) {
                                    responds[i].info.allPreviewsEmpty = true;
                                } else {
                                    responds[i].info.allPreviewsEmpty = false;
                                }
                                console.log(emptyValuesCount)
                                responds[i].info.previewItems = mergedArray;
                            }
                            return {
                                responds: responds,
                                tenderData: tenderData

                            }
                        });

                    }
                } catch (e) {
                    console.log(e);
                } finally {

                }
            }
    },
        data() {
            return {
                openedTab: 'tab3',
                openedTenderTab: 'new',
                comment: '',
                showRespondPopup: false,
                showEditionPopup: false,
                tenderEditingInfo: {},
                months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
                    "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
                // user info
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
          finishCounter() {
              const finishDate = new Date(this.tenderData.finishDate);
              const currentDate = new Date();
              let resultDate = finishDate - currentDate;
              let diffMS = resultDate;
              let diffS = diffMS / 1000;
              let diffM = diffS / 60;
              let diffH = diffM / 60;
              let diffD = Math.floor(diffH / 24);
              return diffD;
          },
          fullProgress() {
              let progress = this.$store.getters.getProgress;
              return progress == 100;
          }
        },
        methods: {
            handlePopupShow(data) {
                this.showRespondPopup = data;
            },
            showBubble(id) {
                const bubble = this.$refs[`bubble${id}`];
                bubble.classList.toggle('bubble--opened');
            },
            refuseTender(event, id) {
                this.$axios({
                    method: "patch",
                    url: `api/tenders/${this.$route.params.id}/respond?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: {
                        participation: 0
                    }
                }).then((response) => {
                    this.$router.push({path: this.$route.path, query: this.$route.query});
                })
            },
            editTender(event, tenderInfo) {
                this.tenderEditingInfo = tenderInfo;
                this.showEditionPopup = true;
            },
            refreshTender() {
                this.$axios({
                    method: 'get',
                    url: `/api/tender/my/${+this.$route.params.id}?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                }).then((response) => {
                    let tenderData = response.data[0];
                    let responds = response.data[0].respond.filter((el) => {
                        return el.answer;
                    });;
                    for (let i = 0; i < responds.length; i++) {
                        let photosArray = responds[i].info.photos_in_list;
                        let videosArray = responds[i].info.videos_in_list;
                        let mergedArray = [];
                        let emptyValuesCount = 0;
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
                                    emptyValuesCount++;
                                    mergedArray[i] = {type: 'empty', preview: '', sort: i};
                                }
                            }
                        }
                        if (emptyValuesCount > 2) {
                            responds[i].info.allPreviewsEmpty = true;
                        } else {
                            responds[i].info.allPreviewsEmpty = false;
                        }
                        console.log(emptyValuesCount)
                        responds[i].info.previewItems = mergedArray;
                    }
                        this.responds = responds;
                        this.tenderData = tenderData;


                });
            },
            updateTender(event, id) {
                this.$axios({
                    method: 'patch',
                    url: `/api/tenders/${id}?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: {
                        closed: true
                    }
                }).then((response) => {
                    this.tenderData.closed = true;
                    this.$router.push({path: this.$route.path, query: this.$route.query});
                })
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
            dismissVendor(vendorId, index) {
              this.$axios({
                  method: "patch",
                  url: `api/tenders/${this.$route.params.id}/respond?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                  data: {
                      dismiss: vendorId
                  }
              }).then((response) => {
                  this.responds.splice(index, 1);
                  this.$router.push({path: this.$route.path, query: this.$route.query});
              })
            },
            answerVendor(vendorId) {
                let chatId = this.$store.state.availableChats.find((element, index, array) => {
                   if(+element.user_id === +vendorId) {
                       return element.user_id;
                   } else if(+element.user_to === +vendorId) {
                       return element.user_to;
                   }
                })
                if(chatId !== undefined) {
                    this.$router.push(`/cabinet/chat/${vendorId}`)
                } else {
                    this.$axios({
                        method: 'post',
                        url: `/api/messages?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                        data: {
                            recipient: vendorId,
                            body: `Тендер "${this.tenderData.name}", дата окончания ${this.tenderData.finishDate}`

                        }
                    }).then((response) => {
                        this.$router.push(`/cabinet/chat/${vendorId}`)
                    })
                }

            },
            handleTenderEdition(data) {
                this.showEditionPopup = data;
                // console.log('test');
                this.refreshTender();
            },
            getChats() {
                this.$axios({
                    method: 'get',
                    url: `/api/chats?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`
                }).then((response) => {
                    let respChats = response.data;
                    let chats = this.$store.state.availableChats;
                    if(chats.length > 0) {
                        chats.concat(respChats);
                    } else {
                        chats = respChats;
                    }
                    this.$store.commit({
                        type: 'setAvailableChats',
                        chats: chats
                    })
                })
            },
            // handleTenderSaving(data) {
            //     if(data) {
            //         this.$route.push('')
            //     }
            // },
            respond() {
                // endpoint: api/tenders/${tenderId}/respond
                this.$axios({
                    method: 'post',
                    url: `/api/tenders/${this.$route.params.id}/respond?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`,
                    data: {
                        comment: this.comment
                    }
                }).then((response) => {
                    this.showRespondPopup = true;
                })
            },
            deleteTender(event, id) {
                this.$axios({
                    method: 'delete',
                    url: `/api/tenders/${id}?token=${this.$auth.$storage['_state']['_token.local'].split(' ')[1]}`
                }).then((response) => {
                    this.$router.push({path: '/cabinet/tenders/'});
                })
            },
            prettifyPrice(price) {
                let value = price.toString().replace(/[^\d]/, '');
                let dirtyVal = value.replace(/ /g,'');
                let val = (+dirtyVal/1).toFixed(0).replace('.', ' ');
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            },
            prettifyPriceRespond(value) {
                let val = (value/1).toFixed(0).replace('.', ' ');
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
        },
        created() {
            this.getChats();
            if (this.$route.params.hasOwnProperty('tab')) {
                this.openedTab = this.$route.params.tab;
            }
        },
        mounted() {

            // if(this.$refs.vendorTabs) {
            //     const selectedTab = this.$refs.vendorTabs.querySelector('input:checked + label');
            //     this.$refs.vendorTabs.scrollLeft = selectedTab.offsetLeft - 20;
            // }

        },
    }

</script>