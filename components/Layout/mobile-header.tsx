import React from 'react';

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '../ui/button';
import { BookCheck, Menu, Star } from 'lucide-react';
import { Const } from '@/lib/contants';
import { RainbowButton } from '../ui/rainbow-button';
import NumberTicker from '../ui/number-ticker';
import Link from 'next/link';
import { isUserAuth } from '@/lib/auth';
import FeedbackModal from '../Modal/feedback-modal';
import { SidebarProvider } from '../ui/sidebar';

export default async function MobileHeader() {
  const isAuthenticated = await isUserAuth();

  return (
    <div className="flex lg:hidden">
      <Drawer>
        <DrawerTrigger>
          <Menu />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              <a className="flex items-center">
                <BookCheck className="rotate-6 stroke-primary" size={32} />
                <span className="text-xl font-bold">{Const.APP_NAME}</span>
              </a>
            </DrawerTitle>
          </DrawerHeader>
          <DrawerFooter>
            {/* <Button variant={"outline"}>Login</Button> */}
            {/* <a
              href="https://www.producthunt.com/posts/daydonezo?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-daydonezo"
              target="_blank"
              className="w-full text-center"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=745904&theme=light"
                alt="DayDonezo - Journaling&#0032;Wins&#0044;&#0032;Designing&#0032;Life | Product Hunt"
                width="250"
                height="54"
              />
            </a> */}
            <div className="flex flex-col gap-2">
              <Link
                href="https://github.com/Jaimin25/DayDonezo"
                className="group h-10 space-x-1 rounded-md"
                target="_blank"
              >
                <RainbowButton className="group space-x-1">
                  <span>Star on Github</span>
                  <Star
                    className="duration-250 fill-gray-400 stroke-gray-400 transition-colors group-hover:fill-yellow-500 group-hover:stroke-yellow-500"
                    size={20}
                  />
                  <NumberTicker value={100} className="text-white" />
                </RainbowButton>
              </Link>
              {isAuthenticated && (
                <SidebarProvider>
                  <FeedbackModal />
                </SidebarProvider>
              )}
              <Link href={isAuthenticated ? '/dashboard' : '/register'}>
                <Button
                  variant={'default'}
                  className="w-100 items-center text-center"
                >
                  {isAuthenticated ? (
                    <span>Dashboard</span>
                  ) : (
                    <span>Get Started</span>
                  )}
                </Button>
              </Link>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
