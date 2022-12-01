// import Exposure from './exposure'
// 曝光埋点
// else if (handleType === 'exposure') {
//     new Exposure(trackConfig).handleExposureEvent({
//         el,
//     })
// }

import { App, DirectiveBinding } from "vue";
import { TrackConfig, TrackParams, EventTrackConfig } from "./types"
import Click from './click'
import Browse from './browse'


// 点击事件
export const clickEvent = (trackConfig: EventTrackConfig) => {
    const clickInstance = new Click(trackConfig)
    const trackParams: TrackParams = {}
    Object.keys(trackConfig).forEach((key) => {
        if (!['baseURL', 'url', 'projectName'].includes(key)) {
            const value = trackConfig[key]
            trackParams[key] = value
        }
    })
    clickInstance.handleSendTrack(trackParams)
}

// 浏览事件
export const browseEvent = (trackConfig: EventTrackConfig) => {
    const browserInstance = new Browse(trackConfig)
    const trackParams: TrackParams = {}
    Object.keys(trackConfig).forEach((key) => {
        if (!['baseURL', 'url', 'projectName'].includes(key)) {
            const value = trackConfig[key]
            trackParams[key] = value
        }
    })
    browserInstance.handleSendTrack(trackParams)
}

class Vue3TrackPlush {
    clickInstance: Click
    browserInstance: Browse
    static install(app: App, trackConfig: TrackConfig) {
        Vue3TrackPlush.prototype.clickInstance = Click.getInstance(trackConfig)
        Vue3TrackPlush.prototype.browserInstance = Browse.getInstance(trackConfig)
        app.directive('track', {
            mounted(el: HTMLElement, binding: DirectiveBinding<TrackParams>) {
                const { arg: trackType, value: trackParams } = binding
                switch (trackType) {
                    // 点击埋点
                    case 'click':
                        // 绑定点击事件
                        Vue3TrackPlush.prototype.clickInstance.handleAddClickEvent({ el, trackParams })
                        break;
                    case 'browse':
                        Vue3TrackPlush.prototype.browserInstance.handleBrowseEvent(trackParams)
                        break;
                    default:
                        break;
                }
            },

            updated(el: HTMLElement, binding: DirectiveBinding<string | Object>) {
                const { arg: trackType, value, oldValue } = binding
                if (JSON.stringify(value) !== JSON.stringify(oldValue)) {
                    switch (trackType) {
                        // 点击埋点
                        case 'click':
                            // 移除点击事件
                            Vue3TrackPlush.prototype.clickInstance.handleRemoveClickEvent(el)
                            // 绑定点击事件
                            Vue3TrackPlush.prototype.clickInstance.handleAddClickEvent({ el, trackParams: value })
                            break;
                        case 'browse':
                            Vue3TrackPlush.prototype.browserInstance.handleBrowseEvent(value)
                            break;
                        default:
                            break;
                    }
                }
            },

            unmounted(el: HTMLElement, binding: DirectiveBinding<TrackParams>) {
                const { arg: trackType } = binding
                switch (trackType) {
                    // 点击埋点
                    case 'click':
                        // 移除点击事件
                        Vue3TrackPlush.prototype.clickInstance.handleRemoveClickEvent(el)
                        break;
                    case 'browse':
                        break;
                    default:
                        break;
                }
            }
        })
    }
}

export default Vue3TrackPlush