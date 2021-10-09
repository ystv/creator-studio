interface IChannel {
    urlName: string
    name: string
    description: string
    thumbnail: string
    outputType: string
    outputURL: string
    status: string
    visibility: string
    location: string
    scheduledStart: Date
    scheduledEnd: Date
}

export default IChannel;