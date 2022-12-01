import { createRequest } from './fetch'
import { TrackConfig, TrackParams } from "./types"

export default class Click {

    trackConfig: TrackConfig

    trackParams: TrackParams

    // 单例模式
    static instance: Click

    constructor(trackConfig: TrackConfig) {
        this.trackConfig = trackConfig
    }

    static getInstance(trackConfig: TrackConfig): Click {
        if (!this.instance) {
            this.instance = new Click(trackConfig)
        }
        return this.instance
    }
    /**
     * @description 添加点击事件
     * @returns {void}
     */
    handleAddClickEvent(params: { el: HTMLElement, trackParams: TrackParams }): void {
        const { el, trackParams } = params
        this.trackParams = trackParams
        el.addEventListener('click', this.handleClickEvent)
    }
    /**
     * @description 移出点击事件
     * @returns {void}
     */
    handleRemoveClickEvent(el: HTMLElement): void {
        el.removeEventListener('click', this.handleClickEvent)
    }

    /**
     * @desc 处理指令点击事件
     * @param {{ el: HTMLElement  }} params 
     */
    handleClickEvent = () => {
        this.handleSendTrack(typeof this.trackParams == "object" ? this.trackParams : { buttonName: this.trackParams })
    }

    /**
     * @description 事件上报
     * @param {Object} data
     */
    handleSendTrack(trackParams: TrackParams) {
        const requestParams = Object.assign({
            userAgent: navigator.userAgent,
            pageUrl: window.location.href,
            projectName: this.trackConfig.projectName,
            actionType: '点击事件',
        }, trackParams)

        createRequest({
            baseURL: this.trackConfig.baseURL,
            url: this.trackConfig.url,
            data: requestParams,
        })
    }
}
