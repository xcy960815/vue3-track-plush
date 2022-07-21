import {
    createRequest
} from './fetch'
import { TrackPlushConfig, Entry, TrackParams } from "./index"

export default class Click {

    trackPlushConfig: TrackPlushConfig

    constructor(trackPlushConfig: TrackPlushConfig) {
        this.trackPlushConfig = trackPlushConfig
    }

    // 处理点击事件
    handleClickEvent(entry: Entry): void {
        if (entry.type === 'customize') {
            // 删掉type属性 type属性 是自用的
            const currentEntry = JSON.parse(JSON.stringify(entry))
            delete currentEntry.type
            this.handleSendTrack({
                userAgent: this.trackPlushConfig.userAgent || navigator.userAgent, //客户端设备
                pageUrl: this.trackPlushConfig.pageUrl || window.location.href, //当前页面路径
                projectName: this.trackPlushConfig.projectName, //项目名称
                actionType: '点击事件',
                ...currentEntry
            })
        } else {
            // 指令埋点上报
            entry.el.addEventListener('click', () => {
                // 获取 节点上 track-params 属性的值 在html节点中 属性所对应的值 只能是字符串 不能传递复杂 数据
                const trackParams: string | Object = entry.VNode.props['track-params']

                if (typeof trackParams == "string") {
                    this.handleSendTrack({
                        buttonName: trackParams, // 如果参数类型是字符串 那就是 按钮名称
                        userAgent: this.trackPlushConfig.userAgent || navigator.userAgent,
                        pageUrl: this.trackPlushConfig.pageUrl || window.location.href,
                        projectName: this.trackPlushConfig.projectName,
                        actionType: '点击事件',
                    })
                } else {
                    this.handleSendTrack({
                        userAgent: this.trackPlushConfig.userAgent || navigator.userAgent,
                        pageUrl: this.trackPlushConfig.pageUrl || window.location.href,
                        projectName: this.trackPlushConfig.projectName,
                        actionType: '点击事件',
                        ...trackParams,
                    })
                }
            })
        }
    }
    /**
     * 事件上报
     * @param {Object} data
     */
    handleSendTrack(trackParams: TrackParams) {
        createRequest({
            baseURL: this.trackPlushConfig.baseURL,
            url: this.trackPlushConfig.url,
            method: this.trackPlushConfig.method || 'POST',
            data: trackParams,
        })
    }
}