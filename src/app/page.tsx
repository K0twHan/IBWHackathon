'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  Holtwood_One_SC,
  Koh_Santepheap
} from 'next/font/google'



const holtwoodOneSC = Holtwood_One_SC({
  weight: '400',
  subsets: ['latin'],
})

const kohSantepheap = Koh_Santepheap({
  weight: '700',
  subsets: ['latin'],
})



const Home = () => {
  return (
    <section className="w-full flex-center flex-col" style={{ marginTop: 100 }}>
      <div
        style={{
          width: "868px",
          height: "100px",
          position: "absolute",
          top: "174px",
          left: "57px",
          opacity: "0px"
        }}
      >
        <span
          className={holtwoodOneSC.className}
          style={{
            fontWeight: 900,
            fontStyle: "normal",
            fontSize: "64px",
            lineHeight: "83.09px",
            letterSpacing: "0.06em",
            textAlign: "left",
            display: "inline-block",
          }}
        >
          Welcome to
        </span>
      </div>
      <div
        style={{
          width: "493px",
          height: "83px",
          position: "absolute",
          top: "253px",
          left: "59px",
          opacity: "0px"
        }}
      >
        <span
          className={holtwoodOneSC.className}
          style={{
            fontWeight: 900,
            fontStyle: "normal",
            fontSize: "64px",
            lineHeight: "83.09px",
            letterSpacing: "0.06em",
            textAlign: "left",
            display: "inline-block",
          }}
        >
          Blog
        </span>
        <span
          className={holtwoodOneSC.className}
          style={{
            fontWeight: 900,
            fontStyle: "normal",
            fontSize: "64px",
            lineHeight: "83.09px",
            letterSpacing: "0.06em",
            textAlign: "left",
            display: "inline-block",
            color: "#E06F1E"
          }}
        >
          Chaın
        </span>
      </div>
      <Image
        src="/assets/images/kedi.png"
        alt="BlogChain"
        className="my-4"
        style={{
          top: "144px",
          left: "761px",
          gap: "0px",
          opacity: " 0px",
          position: "absolute"
        }}
        width={519}
        height={632}
      />
      <Image
        src="/assets/images/isilti.png"
        alt="BlogChain"
        className="my-4"
        style={{
          top: "166px",
          left: "699px",
          gap: "0px",
          opacity: " 0px",
          position: "absolute"
        }}
        width={96}
        height={101}
      />
      <Image
        src="/assets/images/isilti.png"
        alt="BlogChain"
        className="my-4"
        style={{
          top: "623px",
          left: "665px",
          gap: "0px",
          opacity: " 0px",
          position: "absolute"
        }}
        width={67}
        height={52}
      />
      <Image
        src="/assets/images/isilti.png"
        alt="BlogChain"
        className="my-4"
        style={{
          top: "841px",
          left: "879px",
          transform: "rotate(-180deg)",
          gap: "0px",
          opacity: " 0px",
          position: "absolute"
        }}
        width={96}
        height={112}
      />
      <Image
        src="/assets/images/isilti.png"
        alt="BlogChain"
        className="my-4"
        style={{
          top: "515px",
          left: "1169px",
          gap: "0px",
          opacity: " 0px",
          position: "absolute"
        }}
        width={98}
        height={108}
      />
      <Image
        src="/assets/images/isilti.png"
        alt="BlogChain"
        className="my-4"
        style={{
          top: "671px",
          left: "373px",
          gap: "0px",
          opacity: " 0px",
          position: "absolute"
        }}
        width={79}
        height={64}
      />
      <Image
        src="/assets/images/isilti.png"
        alt="BlogChain"
        className="my-4"
        style={{
          top: "776px",
          left: "226px",
          gap: "0px",
          opacity: " 0px",
          position: "absolute"
        }}
        width={22}
        height={26}
      />
      <Image
        src="/assets/images/yildiz.png"
        alt="BlogChain"
        className="my-4"
        style={{
          top: "649px",
          left: "133px",
          transform: "rotate(-180deg)",
          gap: "0px",
          opacity: " 0px",
          position: "absolute"
        }}
        width={98}
        height={86}
      />
      <Image
        src="/assets/images/yildiz.png"
        alt="BlogChain"
        className="my-4"
        style={{
          top: "708px",
          left: "1267px",
          transform: "rotate(-180deg)",
          gap: "0px",
          opacity: " 0px",
          position: "absolute"
        }}
        width={120}
        height={117}
      />
      <Image
        src="/assets/images/yildiz.png"
        alt="BlogChain"
        className="my-4"
        style={{
          top: "107px",
          left: "1280px",
          transform: "rotate(-180deg)",
          gap: "0px",
          opacity: " 0px",
          position: "absolute"
        }}
        width={120}
        height={117}
      />
      <div
        style={{
          width: "261px",
          height: "61px",
          position: "absolute",
          top: "506px",
          left: "57px", 
          padding: "7px 25px",
          borderRadius: "10px",
          opacity: "0px",
          background: "#8B626C",
          textAlign: "center"

        }}
      >
        <Link
          href={"/signup-user"}
        >
          <span
            className={kohSantepheap.className}
            style={{
              fontStyle: "normal",
              fontSize: "24px",
              lineHeight: "50px",
              letterSpacing: "0.06em",
              textAlign: "left",
              color: "white",
            }}
          >
            User
          </span>
        </Link>
      </div>    
      <div
        style={{
          width: "261px",
          height: "61px",
          position: "absolute",
          top: "506px",
          left: "373px", 
          padding: "7px 25px",
          borderRadius: "10px",
          opacity: "0px",
          background: "#8B626C",
          textAlign: "center"

        }}
      >
        <Link
          href={"/signup-author"}
        >
          <span
            className={kohSantepheap.className}
            style={{
              fontStyle: "normal",
              fontSize: "24px",
              lineHeight: "50px",
              letterSpacing: "0.06em",
              textAlign: "left",
              color: "white",
            }}
          >
            Author
          </span>
        </Link>
      </div>    
    </section>
  )
}

export default Home