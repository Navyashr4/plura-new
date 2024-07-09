import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { pricingCards } from '@/lib/constants'
import { stripe } from '@/lib/stripe'
import clsx from 'clsx'
import { Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const prices = await stripe.prices.list({
    product: process.env.NEXT_PLURA_PRODUCT_ID,
    active: true,
  })

  return (
    <>
      <section className="h-full w-full md:pt-44 mt-[-70px] relative flex items-center justify-center flex-col ">
        {/* grid */}

        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />

        <p className="text-center text-2xl">Master the art of marketing your sustainable food products!</p>
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-7xl font-bold text-center md:text-[300px] tracking-tighter">
            EcoBites
          </h1>
        </div>
        <div className="flex justify-center items-center relative md:mt-[-30px]">
          <Image
            src={'/assets/preview.png'}
            alt="banner image"
            height={1200}
            width={1200}
            className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
          />
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
        </div>
      </section>
      <section className="flex justify-center items-center flex-col gap-4 md:!mt-20 mt-[-60px] mb-40">
        <h2 className="text-4xl text-center"> Drive the movement towards a sustainable food future</h2>
        <p className="text-muted-foreground text-center text-xl">
          EcoBites is an innovative web app designed for sustainable <br />
          food manufacturers who want to teach others how to effectively <br />
          market their eco-friendly products. <br />
          Our platform provides a way to build landing pages, manage marketing tasks, <br />
          and sell products seamlessly with Stripe. 
        </p>
      </section>
      <section className="flex justify-center items-center flex-col gap-4 md:!mt-20 mt-[-60px]">
        <h2 className="text-4xl text-center"> Choose what fits you right</h2>
        <p className="text-muted-foreground text-center text-xl">
          Our straightforward pricing plans are tailored to meet your needs. If
          {" you're"} not <br />
          ready to commit you can get started for free.
        </p>
        <div className="flex justify-center gap-4 flex-wrap mt-6">
          {pricingCards.map((card) => (
            //WIP: Wire up free product from stripe
            <Card
              key={card.title}
              className={clsx('w-[300px] flex flex-col justify-between', {
                'border-2 border-primary': card.title === 'Unlimited Saas',
              })}
            >
              <CardHeader>
                <CardTitle
                  className={clsx('', {
                    'text-muted-foreground': card.title !== 'Unlimited Saas',
                  })}
                >
                  {card.title}
                </CardTitle>
                <CardDescription>
                  {card.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-4xl font-bold">
                  {card.price}
                </span>
                <span className="text-muted-foreground">
                </span>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <div>
                  {card.features.map((feature) => (
                    <div 
                      key={feature} 
                      className='flex gap-2 items-center'>
                        <Check className='text-muted-foreground'/>
                        <p>{feature}</p>
                    </div>
                  ))}
                </div>
                <Link
                   href={`/agency?plan=${card.priceId}`}
                   className={clsx(
                     'w-full text-center bg-primary p-2 rounded-md',
                     {
                       '!bg-muted-foreground':
                         card.title !== 'Unlimited Saas',
                     }
                   )}
                 >
                  Get Started
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      <div>
        <footer className="mt-16 text-lg bg-[#7E9091] text-white-600 flex items-center justify-center h-12">
          <p>© EcoBites 2024</p>
        </footer>
      </div>

    </>
  )
}