// import axios from 'axios'
const axios = {} as any

// const BASE_URL = 'http://upload.qiniup.com/'
const BASE_URL = 'http://localhost:8080/uploadurl'
const BASE_TOKEN =
  'Urtp3MqKnVPW_QNGgYzF_SzQGpFiupf8WutRrs8f:OCepCL4TxuLEMF751Gu1nAAYSEU=:eyJyZXR1cm5Cb2R5Ijoie1wia2V5XCI6XCIkKGtleSlcIixcImhhc2hcIjpcIiQoZXRhZylcIixcImZzaXplXCI6JChmc2l6ZSksXCJidWNrZXRcIjpcIiQoYnVja2V0KVwiLFwibmFtZVwiOlwiJCh4Om5hbWUpXCJ9Iiwic2NvcGUiOiJmaWxlbmFtZSIsImRlYWRsaW5lIjoxNTkxNjAyMzQwfQ=='

interface chunksSt {
  file: File
  name: string
  size: number
  offset: number
  progress: number
  md5?: string
}

interface HxUploadProps {
  file: File
  chunkSize?: number
  onProgress?: () => 0
  onFinished?: () => {}
}

/**
 * 
 */
export default class HxUpload {
  file: File

  source: any

  chunkSize: number

  chunks: chunksSt[]

  progress: number

  uploaded: chunksSt[]

  abort: boolean

  onProgress: () => number

  onFinished: () => any

  constructor(opts: HxUploadProps) {
    this.file = opts.file
    this.chunkSize = 4 * 1024 * 1024
    const {CancelToken} = axios
    this.source = CancelToken.source()
    this.progress = 0
    this.chunks = []
    this.uploaded = []
    this.abort = false

    this.onProgress = () => 0
    this.onFinished = () => {}
  }

  // 检查已上传进度
  async checkUploadStatus<T>(): Promise<T[]> {
    this.uploaded = []
    // 更新进度条
    // this.upload
    return []
  }

  // 检查上传是否完成/合并切片
  // checkUploadFinished(): boolean {
  //   return true
  // }

  async getUploadOffset(): Promise<number> {
    return 0
  }

  /**
   * 从服务端获取切片长度
   */
  getSliceLen() {
    const respSize = 4 * 1024 * 1024
    this.chunkSize = respSize
  }

  // 取消上传 todo
  cancel(msg) {
    this.source.cancel(msg)
  }

  /**
   * 文件切分
   * 返回切片list
   */
  getChunks({file, blockSize}: {file: File; blockSize: number}): chunksSt[] {
    const chunks: any[] = []
    let slicedLen = 0
    let idx = 1

    while (slicedLen < file.size) {
      chunks.push({
        file: file.slice(slicedLen, slicedLen + blockSize),
        name: `${file.name}_${idx}`,
        size: blockSize,
        offset: slicedLen,
      })
      slicedLen += blockSize
      idx += 1
    }

    this.chunks = chunks
    console.log('getChunks', chunks)
    return chunks

    // let chunks = [];
    // let count = Math.ceil(file.size / blockSize);
    // for (let i = 0; i < count; i++) {
    //   let chunk = file.slice(
    //     blockSize * i,
    //     i === count - 1 ? file.size : blockSize * (i + 1)
    //   );
    //   chunks.push(chunk);
    // }
    // return chunks;
  }

  // 上传
  upload({
    url = BASE_URL,
    formData,
    onUploadProgress,
  }: {
    url?: string
    formData: FormData
    onUploadProgress?: (progressEvent: ProgressEvent) => void
  }): Promise<any> {
    return new Promise((resolve, reject) => {
      axios({
        url,
        headers: {
          'Content-Type': 'multipart/form-data',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: formData,
        method: 'post',
        transformRequest: [
          data => {
            return data
          },
        ],
        onUploadProgress: progressEvent => {
          onUploadProgress && onUploadProgress(progressEvent)
        },
        cancelToken: this.source.token,
      })
        .then(res => {
          if (res.status === 200) {
            console.log('finished')
          }
          resolve(res)
        })
        .catch(err => [reject(err)])
    })
  }

  updateChunksProgress(evt: ProgressEvent, index: number) {
    // const block = this.chunks[index]
    // this.chunks[index] = {
    //   progress: evt.loaded,
    // }
    this.chunks[index].progress = evt.loaded
    console.log('updateChunksProgress', index, evt.loaded / evt.total)
  }

  // 直接上传
  async directUpload() {
    const {file} = this

    const formData = new FormData()
    formData.append('file', file)
    formData.append('filename', file.name)
    formData.append('token', BASE_TOKEN)

    return this.upload({formData})
  }

  async splitUpload() {
    const {file} = this
    // 获取上次上传进度
    const offset = await this.getUploadOffset()
    const sliceFile = file.slice(offset)

    const formData = new FormData()
    formData.append('file', sliceFile)
    formData.append('filename', file.name)
    formData.append('token', BASE_TOKEN)

    return this.upload({formData})
  }

  // 分片上传
  async resumeUpload() {
    const {file, chunkSize} = this
    // 小于分片大小直接上传
    if (file.size < chunkSize) {
      return this.directUpload()
    }

    const chunkList = await this.getChunks({file, blockSize: chunkSize})

    // 已上传完毕的分片
    const finishedList = await this.checkUploadStatus<
      Pick<chunksSt, 'name' | 'offset' | 'md5'>
    >()

    // 只上传未上传完毕的分片
    const unfinishedList = chunkList.filter(
      item => finishedList.findIndex(i => i.offset === item.offset) === -1
    )

    const requestList = unfinishedList
      .map(({file: fileBlock, name, offset}) => {
        const formData = new FormData()
        formData.append('file', fileBlock)
        formData.append('filename', name)
        formData.append('token', BASE_TOKEN)
        formData.append('offset', String(offset))
        return formData
      })
      .map((formData, index) =>
        this.upload({
          formData,
          onUploadProgress: evt => this.updateChunksProgress(evt, index),
        })
      )

    await Promise.all(requestList).then(res => {
      console.log('all success', res)
      return res
    })
  }
}
