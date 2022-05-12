import {h} from "/js/src/index.js";
import {info, iconPerson} from "/js/src/icons.js";

export const homePage = (model) => {
    // Wrapper component to avoid display flex
    return [
        h('h2', `Hello ${model.home.getUserName()}, this is the home page!`),
        h('.flex-row', [
            h('button.btn.btn-primary.m1', {
                title: 'About',
                type: 'button',
                onclick: () => model.router.go('?page=about'),
            }, info()),
            h('button.btn.m1', {
                onclick: () => model.home.setUserName('mboulais')
            }, iconPerson()),
        ])
    ];
}