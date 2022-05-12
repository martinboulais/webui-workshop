import {h, switchCase} from '/js/src/index.js';
import {aboutPage} from "./about/aboutPage.js";
import {homePage} from "./home/homePage.js";

/**
 * Main view layout
 * @param {Model} model - representing current application state
 * @return {vnode} application view to be drawn according to model
 */
export const view = (model) => [
    h('.flex-column.absolute-fill', [
        header(model),
        content(model)
    ])
];

/**
 * Top header of the page
 * @param {Model} model
 * @return {vnode}
 */
const header = (model) => {
    return [
        h(
            '.p2.f2.shadow-level2.level2',
            {style: 'display: flex; justify-content: center'},
            [
                model.header.getNumber() !== null ? h('.badge.bg-gray.mh2', model.header.getNumber()) : '',
                `You are at the page: ${model.router.params.page}`
            ]
        )
    ];
}

/**
 * Page content
 * @param {Model} model
 * @return {vnode}
 */
const content = (model) => {
    return switchCase(model.router.params.page, {
        home: homePage(model),
        about: aboutPage(model)
    }, h('h2', '404 - Not found'))
};
