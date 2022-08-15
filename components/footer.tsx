import styles from './layout.module.css';
import Image from 'next/image';
import ToggleLights from './toggle-light';
import { footerIconSize } from './layout';

const ArFooter = () => {
    return (
        <footer className={styles.footer}>
            <span>Made with</span>
            <Image
                src="/heart.svg"
                height={footerIconSize}
                width={footerIconSize}
                alt={'LOVE'}
            />
            <span>,</span>
            <Image
                src="/nextjs.svg"
                height={footerIconSize}
                width={footerIconSize}
                alt={'NEXTJS'}
            />
            <span>and</span>
            <Image
                src="/vercel.svg"
                height={footerIconSize}
                width={footerIconSize}
                alt={'VERCEL'}
            />
            <div className={styles.footerDivider}></div>
            <span>Source on</span>
            <a
                rel={'noreferrer'}
                target={'_blank'}
                href="https://github.com/ArthurianX/arthur-kovacs-is"
            >
                <Image
                    src="/github.svg"
                    height={footerIconSize}
                    width={footerIconSize}
                    alt={'GITHUB'}
                />
            </a>
            <div className={styles.footerDivider}></div>
            <ToggleLights />
        </footer>
    );
};

export default ArFooter;
