import {h} from "/js/src/index.js";
import {iconHome, iconCloudDownload} from "/js/src/icons.js"

/**
 * @param {Model} model
 * @param {About} about
 * @returns {*}
 */
export const aboutPage = (model) => {
    const detailsRemoteData = model.about.getDetails();

    return detailsRemoteData.match({
        NotAsked: () => h('h2', 'Data not fetched yet'),
        Loading: () => [
            h('h2', 'Data loading...'),
            h('.absolute-fill.flex-column.items-center.justify-center', [
                h('.f5', 'Loading...')
            ])
        ],
        Failure: error => [
            h('h2', 'Failed to load data'),
            h('.error', [error])
        ],
        Success: details => [
            h('h2', 'This is the about page!'),
            h('table.table', [
                h('thead', [
                    h('tr', [
                        h('th', 'Id'),
                        h('th', 'Name'),
                    ]),
                ]),
                h('tbody', [
                    details.map(detail => h('tr', {key: detail.id}, [
                        h('td', detail.id),
                        h('td', detail.name)
                    ]))
                ])
            ]),
            h('.flex-row', [
                h('button.btn.btn-primary.m1', {
                    onclick: () => model.router.go('?page=home')
                }, iconHome()),
                h('button.btn.m1', {
                    title: 'Request data',
                    onclick: () => console.log('I should fetch data')
                }, iconCloudDownload()),
            ]),
        ]
    });
}