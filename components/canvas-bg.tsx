import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { NextPage } from 'next';
import * as PIXI from 'pixi.js';
import { KawaseBlurFilter } from '@pixi/filter-kawase-blur';
import { createNoise2D } from 'simplex-noise';
import hsl from 'hsl-to-hex';
import debounce from 'debounce';
import { createRef } from 'react';
import dynamic from 'next/dynamic';
import { Graphics } from 'pixi.js';

const name = 'Arthur Kovacs is';
export const siteTitle = 'Arthur Kovacs is';
export const footerIconSize = 18;

const AnimatedCanvas: NextPage<any> = () => {
    const canvasRef = createRef<any>();

    // return a random number within a range
    function random(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    // map a number from 1 range to another
    function map(
        n: number,
        start1: number,
        end1: number,
        start2: number,
        end2: number,
    ) {
        return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
    }
    // Create PixiJS app
    const app = new PIXI.Application({
        // render to <canvas class="orb-canvas"></canvas>
        // @ts-ignore
        view: document.querySelector('.orbCanvas'),
        // auto adjust size to fit the current window
        resizeTo: window,
        // transparent background, we will be creating a gradient background later using CSS
        backgroundAlpha: 0,
    });

    app.stage.filters = [new KawaseBlurFilter(30, 10, true)];

    const noise2D = createNoise2D();

    // Orb class
    class Orb {
        // Pixi takes hex colors as hexidecimal literals (0x rather than a string with '#')
        private bounds: {
            x: { min: number; max: number };
            y: { min: number; max: number };
        };
        private x: any;
        private y: any;
        private scale: number;
        private fill: string | undefined;
        private radius: any;
        private xOff: any;
        private yOff: any;
        private inc: number;
        graphics: Graphics;

        constructor(fill?: string) {
            // bounds = the area an orb is "allowed" to move within
            this.bounds = this.setBounds();
            // initialise the orb's { x, y } values to a random point within it's bounds
            this.x = random(this.bounds['x'].min, this.bounds['x'].max);
            this.y = random(this.bounds['y'].min, this.bounds['y'].max);

            // how large the orb is vs it's original radius (this will modulate over time)
            this.scale = 1;

            // what color is the orb?
            this.fill = fill;

            // the original radius of the orb, set relative to window height
            this.radius = random(
                window.innerHeight / 6,
                window.innerHeight / 3,
            );

            // starting points in "time" for the noise/self similar random values
            this.xOff = random(0, 1000);
            this.yOff = random(0, 1000);
            // how quickly the noise/self similar random values step through time
            this.inc = 0.002;

            // PIXI.Graphics is used to draw 2d primitives (in this case a circle) to the canvas
            this.graphics = new PIXI.Graphics();
            this.graphics.alpha = 0.825;

            // 250ms after the last window resize event, recalculate orb positions.
            window.addEventListener(
                'resize',
                debounce(() => {
                    this.bounds = this.setBounds();
                }, 250),
            );
        }

        setBounds() {
            // how far from the { x, y } origin can each orb move
            const maxDist =
                window.innerWidth < 1000
                    ? window.innerWidth / 3
                    : window.innerWidth / 5;
            // the { x, y } origin for each orb (the bottom right of the screen)
            const originX = window.innerWidth / 1.25;
            const originY =
                window.innerWidth < 1000
                    ? window.innerHeight
                    : window.innerHeight / 1.375;

            // allow each orb to move x distance away from it's { x, y }origin
            return {
                x: {
                    min: originX - maxDist,
                    max: originX + maxDist,
                },
                y: {
                    min: originY - maxDist,
                    max: originY + maxDist,
                },
            };
        }

        update() {
            // self similar "psuedo-random" or noise values at a given point in "time"
            const xNoise = noise2D(this.xOff, this.xOff);
            const yNoise = noise2D(this.yOff, this.yOff);
            const scaleNoise = noise2D(this.xOff, this.yOff);

            // map the xNoise/yNoise values (between -1 and 1) to a point within the orb's bounds
            this.x = map(
                xNoise,
                -1,
                1,
                this.bounds['x'].min,
                this.bounds['x'].max,
            );
            this.y = map(
                yNoise,
                -1,
                1,
                this.bounds['y'].min,
                this.bounds['y'].max,
            );
            // map scaleNoise (between -1 and 1) to a scale value somewhere between half of the orb's original size, and 100% of it's original size
            this.scale = map(scaleNoise, -1, 1, 0.5, 1);

            // step through "time"
            this.xOff += this.inc;
            this.yOff += this.inc;
        }

        render() {
            // update the PIXI.Graphics position and scale values
            this.graphics.x = this.x;
            this.graphics.y = this.y;
            this.graphics.scale.set(this.scale);

            // clear anything currently drawn to graphics
            this.graphics.clear();

            // tell graphics to fill any shapes drawn after this with the orb's fill color
            // @ts-ignore
            this.graphics.beginFill(this.fill);
            // draw a circle at { 0, 0 } with it's size set by this.radius
            this.graphics.drawCircle(0, 0, this.radius);
            // let graphics know we won't be filling in any more shapes
            this.graphics.endFill();
        }
    }

    class ColorPalette {
        private hue: number | undefined;
        private complimentaryHue1: number | undefined;
        private complimentaryHue2: number | undefined;
        private saturation: number | undefined;
        private lightness: number | undefined;
        private baseColor: string | undefined;
        private complimentaryColor1: string | undefined;
        private complimentaryColor2: string | undefined;
        private colorChoices: string[] | undefined;
        constructor() {
            this.setColors();
            this.setCustomProperties();
        }

        setColors() {
            // pick a random hue somewhere between 220 and 360
            this.hue = ~~random(220, 360);
            this.complimentaryHue1 = this.hue + 30;
            this.complimentaryHue2 = this.hue + 60;
            // define a fixed saturation and lightness
            this.saturation = 95;
            this.lightness = 50;

            // define a base color
            this.baseColor = hsl(this.hue, this.saturation, this.lightness);
            // define a complimentary color, 30 degress away from the base
            this.complimentaryColor1 = hsl(
                this.complimentaryHue1,
                this.saturation,
                this.lightness,
            );
            // define a second complimentary color, 60 degrees away from the base
            this.complimentaryColor2 = hsl(
                this.complimentaryHue2,
                this.saturation,
                this.lightness,
            );

            // store the color choices in an array so that a random one can be picked later
            this.colorChoices = [
                this.baseColor,
                this.complimentaryColor1,
                this.complimentaryColor2,
            ];
        }

        randomColor() {
            // pick a random color
            return this.colorChoices![
                ~~random(0, this.colorChoices!.length)
            ].replace('#', '0x');
        }

        setCustomProperties() {
            // set CSS custom properties so that the colors defined here can be used throughout the UI
            // @ts-ignore
            document.documentElement.style.setProperty('--hue', this.hue);
            document.documentElement.style.setProperty(
                '--hue-complimentary1',
                // @ts-ignore
                this.complimentaryHue1,
            );
            // @ts-ignore
            document.documentElement.style.setProperty(
                '--hue-complimentary2',
                // @ts-ignore
                this.complimentaryHue2,
            );
        }
    }

    const colorPalette = new ColorPalette();
    // Create orbs
    const orbs: Orb[] = [];

    for (let i = 0; i < 10; i++) {
        // each orb will be black, just for now
        const orb = new Orb(colorPalette.randomColor());
        app.stage.addChild(orb.graphics);

        orbs.push(orb);
    }

    // Animate!
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        app.ticker.add(() => {
            // update and render each orb, each frame. app.ticker attempts to run at 60fps
            orbs.forEach((orb) => {
                orb.update();
                orb.render();
            });
        });
    } else {
        // perform one update and render per orb, do not animate
        orbs.forEach((orb) => {
            orb.update();
            orb.render();
        });
    }

    return <></>;
};

export default AnimatedCanvas;
