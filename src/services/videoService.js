import { supabase, isSupabaseConfigured } from './supabase'

const VIDEO_DATABASE = 'wexsee-lesson-videos'
const VIDEO_STORE = 'videos'
const MAX_VIDEO_SIZE = 100 * 1024 * 1024

function openVideoDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(VIDEO_DATABASE, 1)
    request.onupgradeneeded = () => {
      request.result.createObjectStore(VIDEO_STORE)
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error || new Error('Could not open local video storage.'))
  })
}

export async function uploadLessonVideo(file, courseId) {
  const supportedTypes = ['video/mp4', 'video/webm', 'video/quicktime']
  if (!file || !supportedTypes.includes(file.type)) {
    throw new Error('Choose an MP4, WebM, or QuickTime video file.')
  }
  if (file.size > MAX_VIDEO_SIZE) {
    throw new Error('Videos must be 100 MB or smaller.')
  }

  if (isSupabaseConfigured) {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-')
    const path = `${courseId}/${crypto.randomUUID()}-${safeName}`
    const { error } = await supabase.storage
      .from('lesson-videos')
      .upload(path, file, { contentType: file.type, upsert: false })
    if (error) throw error

    const { data } = supabase.storage.from('lesson-videos').getPublicUrl(path)
    return { video_url: data.publicUrl, video_source_type: 'upload' }
  }

  const database = await openVideoDatabase()
  const videoId = crypto.randomUUID()
  await new Promise((resolve, reject) => {
    const transaction = database.transaction(VIDEO_STORE, 'readwrite')
    transaction.objectStore(VIDEO_STORE).put(file, videoId)
    transaction.oncomplete = resolve
    transaction.onerror = () => reject(transaction.error || new Error('Could not save the video locally.'))
    transaction.onabort = () => reject(transaction.error || new Error('Video storage was interrupted.'))
  })
  database.close()
  return { video_url: `local-video:${videoId}`, video_source_type: 'upload' }
}

export async function resolveLessonVideo(videoUrl) {
  if (!videoUrl?.startsWith('local-video:')) return { url: videoUrl, isLocal: false }

  const videoId = videoUrl.slice('local-video:'.length)
  const database = await openVideoDatabase()
  const file = await new Promise((resolve, reject) => {
    const request = database.transaction(VIDEO_STORE, 'readonly').objectStore(VIDEO_STORE).get(videoId)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error || new Error('Could not load the saved lesson video.'))
  })
  database.close()

  if (!file) throw new Error('This lesson video is missing from local storage. Upload it again.')
  return { url: URL.createObjectURL(file), isLocal: true }
}
