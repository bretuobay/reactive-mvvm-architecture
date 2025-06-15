import Image, { type ImageProps } from 'next/image';
import { Button } from '@repo/ui/button';
import Link from 'next/link';
import styles from './page.module.css';

type Props = Omit<ImageProps, 'src'> & {
  srcLight: string;
  srcDark: string;
};

const ResponsiveImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;
  return (
    <>
      <Image {...rest} src={srcLight} className={`${props.className} ${styles.imgLight}`} />
      <Image {...rest} src={srcDark} className={`${props.className} ${styles.imgDark}`} />
    </>
  );
};

export default function Page() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>
            Turborepo + Next.js + Tailwind CSS + MDX
            <br />
            Starter Template
          </h1>
          <p className={styles.description}>
            A monorepo starter template for building apps and websites with Next.js, Tailwind CSS,
            MDX, and Turborepo.
          </p>
          <div className={styles.ctas}>
            <a className="primary" href="https://example.com">
              Next steps
            </a>
            <Button appName="docs" className="secondary">
              Open alert
            </Button>
          </div>
        </div>

        <ResponsiveImage
          srcLight="/hero-light.svg"
          srcDark="/hero-dark.svg"
          width={600}
          height={300}
          alt="Hero image"
        />
      </div>

      <div className={styles.content}>
        <h2>Get started</h2>
        <ol>
          <li>
            Get started by editing <code>apps/docs/app/page.tsx</code>
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.section}>
          <h2>Project Documentation</h2>
          <ul className={styles.linkList}>
            <li>
              <Link href="/mvvm">Understanding MVVM</Link>
            </li>
            <li>
              <Link href="/models">Data Models (`packages/models`)</Link>
            </li>
            <li>
              <Link href="/view-models">ViewModels (`packages/view-models`)</Link>
            </li>
            <li>
              <Link href="/frameworks">ViewModel Usage in Frontend Frameworks</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=app&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=app&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=app&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=app&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
