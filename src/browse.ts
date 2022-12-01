import { createRequest } from './fetch'

import { TrackConfig, TrackParams } from "./types"

// 页面浏览
export default class Browse {

    trackConfig: TrackConfig

    static instance: Browse

    static getInstance(trackConfig: TrackConfig): Browse {
        if (!this.instance) {
            this.instance = new Browse(trackConfig)
        }
        return this.instance
    }

    constructor(trackConfig: TrackConfig) {
        this.trackConfig = trackConfig
    }

    // 处理浏览事件
    handleBrowseEvent(trackParams: TrackParams): void {
        this.handleSendTrack(typeof trackParams === 'object' ? trackParams : { pageName: trackParams })
    }

    handleSendTrack(trackParams: TrackParams): void {
        const requestParams = Object.assign({
            userAgent: navigator.userAgent,
            pageUrl: window.location.href,
            projectName: this.trackConfig.projectName,
            actionType: '浏览事件',
        }, trackParams)

        createRequest({
            baseURL: this.trackConfig.baseURL,
            url: this.trackConfig.url,
            data: requestParams,
        })
    }
}