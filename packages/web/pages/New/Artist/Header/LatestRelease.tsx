import { resizeImage } from '@/web/utils/common'
import dayjs from 'dayjs'
import { cx, css } from '@emotion/css'
import { useNavigate, useParams } from 'react-router-dom'
import Image from '@/web/components/New/Image'
import useArtistAlbums from '@/web/api/hooks/useArtistAlbums'
import { useMemo } from 'react'

const Album = () => {
  const params = useParams()
  const navigate = useNavigate()

  const { data: albumsRaw, isLoading: isLoadingAlbums } = useArtistAlbums({
    id: Number(params.id) || 0,
    limit: 1000,
  })

  const album = useMemo(() => albumsRaw?.hotAlbums?.[0], [albumsRaw?.hotAlbums])

  if (!album) {
    return <></>
  }

  return (
    <div
      onClick={() => navigate(`/album/${album.id}`)}
      className='flex rounded-24 bg-white/10 p-2.5'
    >
      <Image
        src={resizeImage(album.picUrl, 'sm')}
        className={cx(
          'aspect-square shrink-0',
          css`
            height: 60px;
            width: 60px;
            border-radius: 16px;
          `
        )}
      />
      <div className='ml-2 flex-shrink-1'>
        <div className='font-medium line-clamp-1 text-16 text-night-100'>
          {album.name}
        </div>
        <div className='mt-1 font-bold text-14 text-night-500'>
          {album.type}
          {album.size > 1 ? `· ${album.size} Tracks` : ''}
        </div>
        <div className='mt-1.5 text-12 font-medium text-night-500'>
          {dayjs(album?.publishTime || 0).format('MMM DD, YYYY')}
        </div>
      </div>
    </div>
  )
}

const Video = () => {
  return (
    <div className='mt-4 flex rounded-24 bg-white/10 p-2.5'>
      <Image
        src={resizeImage(
          'https://p1.music.126.net/am47BH30IGQit_L2vYaArg==/109951167502760845.jpg',
          'sm'
        )}
        className={cx(
          css`
            height: 60px;
            width: 106px;
            border-radius: 16px;
          `
        )}
      />
      <div className='ml-2 flex-shrink-1'>
        <div className='font-medium line-clamp-2 text-16 text-night-100'>
          Swedish House Mafia & The Weeknd Live at C...
        </div>
        <div className='mt-1.5 text-12 font-medium text-night-500'>
          {dayjs().format('MMM DD, YYYY')}
        </div>
      </div>
    </div>
  )
}

const LatestRelease = () => {
  return (
    <div className='mx-2.5 lg:mx-0'>
      <div className='mb-3 font-bold mt-7 text-14 text-neutral-300'>
        Latest Releases
      </div>

      <Album />
      <Video />
    </div>
  )
}

export default LatestRelease
