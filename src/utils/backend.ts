import { AxiosResponse } from "axios"
import { request } from "./request"

const backendReq = (payload: any) => {
  const baseUrl = 'https://avatardemo.onrender.com/docs'
  return request({
    ...payload,
    baseUrl,
  })
}

const handleMedia = (res: AxiosResponse) => {
  const blob = new Blob([res.data], { type: (res?.headers?.['Content-Type'] as string)?.toLowerCase() });
  return URL.createObjectURL(blob)
}

const handleVideo = (res: AxiosResponse) => {
  const blob = new Blob([res.data], { type: (res?.headers?.['Content-Type'] as string)?.toLowerCase() });
  const file = new File([blob], 'uploaded_image.mp4', { type: (res?.headers?.['Content-Type'] as string)?.toLowerCase() || 'video/mp4' });

  return file
}

const handleImage = (response: AxiosResponse) => {
    let image = btoa(
      new Uint8Array(response.data)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    // const base64Img = `data:${(response?.headers?.['Content-Type'] as string)?.toLowerCase()};base64,${image}`
    const byteCharacters = atob(image);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: (response?.headers?.['Content-Type'] as string)?.toLowerCase() || 'image/png' });

      // Create a File object from the Blob
      const file = new File([blob], 'uploaded_image.png', { type: (response?.headers?.['Content-Type'] as string)?.toLowerCase() || 'image/png' });

      return file;
  }

export const BackendAPI = {
  avatarWithPrompt: ({prompt, file}: any) => backendReq({
    data: {prompt, file},
    method: "POST",
    endpoint: `generate_avatar_images`,
    contentType: 'multipart/form-data',
    responseType: 'arraybuffer'
  }).then(handleImage),
  generateAudio: ({content, gender}: any) => backendReq({
    data: {content, gender},
    method: "POST",
    endpoint: `generate_audio`,
    responseType: 'arraybuffer',
  }).then(handleMedia),
  generateAiAvatarVideo: ({username}: any) => backendReq({
    endpoint: `generate_ai_avatar_video?username=${username}`,
    responseType: 'arraybuffer',
  }).then(handleVideo),
}