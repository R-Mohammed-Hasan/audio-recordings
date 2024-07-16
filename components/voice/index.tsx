import React from "react";
import { Card, CardBody, Image, Button, Slider } from "@nextui-org/react";
import { HeartIcon } from "../icons/heart";
import { NextIcon } from "../icons/next";
import { PauseCircleIcon } from "../icons/pause-circle";
import { PreviousIcon } from "../icons/previous";
import CallRecording from "../audio-waves";

export default function AudioCard({ audioUrl, id }) {
  const [liked, setLiked] = React.useState(false);

  return (
    <Card
      className="border-none w-full p-4 bg-background/60 dark:bg-default-100/50 max-w-[700px]"
      shadow="md"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Album cover"
              className="object-cover"
              height={200}
              shadow="md"
              src="https://nextui.org/images/album-cover.png"
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="font-semibold text-foreground/90">Daily Mix</h3>
                <p className="text-small text-foreground/80">12 Tracks</p>
                <h1 className="text-large font-medium mt-2">Frontend Radio</h1>
              </div>
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onPress={() => setLiked((v) => !v)}
              >
                <HeartIcon
                  className={liked ? "[&>path]:stroke-transparent" : ""}
                  fill={liked ? "currentColor" : "none"}
                />
              </Button>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              <CallRecording id={id} audioUrl={audioUrl} />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
