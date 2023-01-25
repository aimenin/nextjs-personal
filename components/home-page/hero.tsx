import Image from 'next/image';
import { FC } from 'react';

import classes from './hero.module.css';

const Hero: FC = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/me.jpg"
          alt="An image showing Artem"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I&apos;m Artem</h1>
      <p>I&apos;m front end engineer</p>
    </section>
  );
};

export default Hero;
