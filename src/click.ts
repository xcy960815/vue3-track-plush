import {
    createRequest
} from './fetch'
import { TrackPlushConfig, Entry } from "./index"

export default class Click {
    trackPlushConfig: TrackPlushConfig
    constructor(trackPlushConfig) {
        this.trackPlushConfig = trackPlushConfig || {}
    }
    // 处理点击事件
    handleClickEvent(entry: Entry): void {
        if (entry.type === 'customize') {
            this.handleSendTrack({
                buttonName: entry.buttonName,
                userAgent: this.trackPlushConfig.userAgent || navigator.userAgent, //客户端设备
                pageUrl: this.trackPlushConfig.pageUrl || window.location.href, //当前页面路径
                projectName: this.trackPlushConfig.projectName, //项目名称
                actionType: '点击事件',
            })
        } else {
            const trackParams = entry.el.attributes['track-params']
            const buttonName = trackParams ? trackParams.value : null
            entry.el.addEventListener('click', () => {
                this.handleSendTrack({
                    buttonName,
                    userAgent: this.trackPlushConfig.userAgent || navigator.userAgent, //客户端设备
                    pageUrl: this.trackPlushConfig.pageUrl || window.location.href, //当前页面路径
                    projectName: this.trackPlushConfig.projectName, //项目名称
                    actionType: '点击事件',
                })
            })
        }
    }
    /**
     * 事件上报
     * @param {Object} data
     */
    handleSendTrack(trackParams) {
        createRequest({
            baseURL: this.trackPlushConfig.baseURL,
            url: this.trackPlushConfig.url,
            method: this.trackPlushConfig.method || 'POST',
            data: trackParams,
        })
    }
}