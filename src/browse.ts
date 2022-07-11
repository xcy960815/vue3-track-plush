import {
    createRequest
} from './fetch'
import { TrackPlushConfig, Entry } from "./index"

// 页面浏览
export default class Browse {
    trackPlushConfig: TrackPlushConfig
    constructor(trackPlushConfig) {
        this.trackPlushConfig = trackPlushConfig || {}
    }
    // 处理浏览事件
    handleBrowseEvent(entry: Entry) {
        if (entry.type === 'customize') {
            this.handleSendTrack({
                pageName: entry.pageName, //页面名称
                userAgent: this.trackPlushConfig.userAgent || navigator.userAgent, // 客户端设备
                pageUrl: this.trackPlushConfig.pageUrl || window.location.href, // 当前页面路径
                projectName: this.trackPlushConfig.projectName, // 项目名称
                actionType: '浏览事件',
            })
        } else {
            const trackParams = entry.el.attributes['track-params']
            const pageName = trackParams ? trackParams.value : null
            this.handleSendTrack({
                pageName, //页面名称
                userAgent: this.trackPlushConfig.userAgent || navigator.userAgent, // 客户端设备
                pageUrl: this.trackPlushConfig.pageUrl || window.location.href, // 当前页面路径
                projectName: this.trackPlushConfig.projectName, // 项目名称
                actionType: '浏览事件',
            })
        }
    }

    /**
     * 事件上报
     * @param {Object} data
     * @returns void
     */
    handleSendTrack(data) {
        createRequest({
            baseURL: this.trackPlushConfig.baseURL,
            url: this.trackPlushConfig.url,
            method: this.trackPlushConfig.method || 'POST',
            data,
        })
    }
}