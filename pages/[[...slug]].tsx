import { PreviewSuspense } from '@sanity/preview-kit'
import { PreviewWrapper } from 'components/preview/PreviewWrapper'
import { GetStaticProps } from 'next'
import { lazy } from 'react'
import { PagePayload } from 'types'
import { pagesBySlugQuery, pagePathsQuery } from '../sanity/lib/sanity.queries'
import {
  getFooter,
  getNavigation,
  getPageBySlug,
  getPagePaths,
} from '../sanity/lib/sanity.client'
import { buildComponent } from 'utils/buildComponent'

const PagePreview = lazy(() => import('layout/Preview'))

interface PageProps {
  page?: PagePayload
  homePageTitle?: string
  preview: boolean
  token: string | null
}

interface Query {
  [key: string]: string[]
}

interface PreviewData {
  token?: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { page, preview, token } = props

  // TODO: Use buildComponent to render the components on the page
  const Page = ({ page }) => <></>

  if (preview) {
    return (
      <PreviewSuspense
        fallback={
          <PreviewWrapper>
            <Page page={page} />
          </PreviewWrapper>
        }
      >
        <PagePreview
          token={token}
          PageComponent={Page}
          pageQuery={pagesBySlugQuery}
          slug={page?.slug}
        />
      </PreviewSuspense>
    )
  }

  return <Page page={page} />
}

export const getStaticProps: GetStaticProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {}, params = {} } = ctx
  const token = previewData.token
  const [page, navigation, footer] = await Promise.all([
    getPageBySlug({
      token,
      // TODO: BONUS! Replace pagesBySlugQuery with your own query
      query: pagesBySlugQuery,
      params: {
        slug: params.slug ? params.slug.join('/') : '/',
      },
    }),
    getNavigation({ token }),
    getFooter({ token }),
  ])

  if (!page) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      global: {
        navigation,
        footer,
      },
      page,
      preview,
      token: previewData.token ?? null,
    },
  }
}

export const getStaticPaths = async () => {
  // TODO: BONUS! Replace pagePathsQuery with your own query
  const paths = await getPagePaths(pagePathsQuery)

  return {
    // TODO: Map the paths return from Sanity into the correct shape that Next.js is expecting
    paths: paths.map((path) => {
      return {
        params: { slug: path.replace('/', '').split('/') },
      }
    }),
    fallback: false,
  }
}
