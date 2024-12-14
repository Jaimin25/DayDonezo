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
            <RainbowButton className="group space-x-1">
              <span>Star on Github</span>
              <Star
                className="duration-250 fill-gray-400 stroke-gray-400 transition-colors group-hover:fill-yellow-500 group-hover:stroke-yellow-500"
                size={20}
              />
              <NumberTicker value={100} className="text-white" />
            </RainbowButton>
            <Link
              href={isAuthenticated ? '/dashboard' : '/register'}
              className="w-full"
            >
              <Button
                variant={'default'}
                className="w-full items-center text-center"
              >
                {isAuthenticated ? (
                  <span>Dashboard</span>
                ) : (
                  <span>Get Started</span>
                )}
              </Button>
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
