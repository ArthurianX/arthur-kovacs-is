import { NextPage } from 'next';
import * as PIXI from 'pixi.js';
import { KawaseBlurFilter } from '@pixi/filter-kawase-blur';
import { createNoise2D } from 'simplex-noise';
import hsl from 'hsl-to-hex';
import debounce from 'debounce';
import { Graphics } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { ColorPalette } from '../utils/generate-color-scheme';
import { useColorMode } from '@chakra-ui/react';

type Noise2D = ReturnType<typeof createNoise2D>;

function random(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function map(
    n: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number,
) {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

class AnimatedColorPalette {
    private hue = 240;
    private complimentaryHue1 = 270;
    private complimentaryHue2 = 300;
    private saturation = 95;
    private lightness = 80;
    private colorChoices: number[] = [];

    setColors(hue: number, colorMode: 'light' | 'dark') {
        this.hue = hue;
        this.complimentaryHue1 = hue + 30;
        this.complimentaryHue2 = hue + 60;

        if (colorMode === 'dark') {
            this.saturation = 45;
            this.lightness = 25;
        } else {
            this.saturation = 95;
            this.lightness = 80;
        }

        this.colorChoices = [
            this.toPixiColor(this.hue),
            this.toPixiColor(this.complimentaryHue1),
            this.toPixiColor(this.complimentaryHue2),
        ];
    }

    randomColor() {
        return this.colorChoices[Math.floor(random(0, this.colorChoices.length))];
    }

    setCustomProperties() {
        document.documentElement.style.setProperty('--hue', String(this.hue));
        document.documentElement.style.setProperty(
            '--hue-complimentary1',
            String(this.complimentaryHue1),
        );
        document.documentElement.style.setProperty(
            '--hue-complimentary2',
            String(this.complimentaryHue2),
        );
    }

    private toPixiColor(hue: number) {
        return Number(hsl(hue, this.saturation, this.lightness).replace('#', '0x'));
    }
}

class Orb {
    private bounds: {
        x: { min: number; max: number };
        y: { min: number; max: number };
    };
    private x: number;
    private y: number;
    private scale = 1;
    private readonly fill: number;
    private readonly radius: number;
    private xOff: number;
    private yOff: number;
    private readonly inc = 0.002;
    private readonly noise2D: Noise2D;
    private readonly resizeHandler: () => void;
    graphics: Graphics;

    constructor(fill: number, noise2D: Noise2D) {
        this.noise2D = noise2D;
        this.fill = fill;
        this.bounds = this.setBounds();
        this.x = random(this.bounds.x.min, this.bounds.x.max);
        this.y = random(this.bounds.y.min, this.bounds.y.max);
        this.radius = random(window.innerHeight / 6, window.innerHeight / 3);
        this.xOff = random(0, 1000);
        this.yOff = random(0, 1000);
        this.graphics = new PIXI.Graphics();
        this.graphics.alpha = 0.825;

        this.resizeHandler = debounce(() => {
            this.bounds = this.setBounds();
        }, 250);

        window.addEventListener('resize', this.resizeHandler);
    }

    update() {
        const xNoise = this.noise2D(this.xOff, this.xOff);
        const yNoise = this.noise2D(this.yOff, this.yOff);
        const scaleNoise = this.noise2D(this.xOff, this.yOff);

        this.x = map(xNoise, -1, 1, this.bounds.x.min, this.bounds.x.max);
        this.y = map(yNoise, -1, 1, this.bounds.y.min, this.bounds.y.max);
        this.scale = map(scaleNoise, -1, 1, 0.5, 1);
        this.xOff += this.inc;
        this.yOff += this.inc;
    }

    render() {
        this.graphics.x = this.x;
        this.graphics.y = this.y;
        this.graphics.scale.set(this.scale);
        this.graphics.clear();
        this.graphics.beginFill(this.fill);
        this.graphics.drawCircle(0, 0, this.radius);
        this.graphics.endFill();
    }

    destroy() {
        window.removeEventListener('resize', this.resizeHandler);
        this.graphics.destroy();
    }

    private setBounds() {
        const maxDist =
            window.innerWidth < 1000 ? window.innerWidth / 3 : window.innerWidth / 5;
        const originX = window.innerWidth / 1.25;
        const originY =
            window.innerWidth < 1000
                ? window.innerHeight
                : window.innerHeight / 1.375;

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
}

function startOrbsAnimation(app: PIXI.Application, orbs: Orb[]) {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const tick = () => {
            orbs.forEach((orb) => {
                orb.update();
                orb.render();
            });
        };

        app.ticker.add(tick);

        return () => {
            app.ticker.remove(tick);
        };
    }

    orbs.forEach((orb) => {
        orb.update();
        orb.render();
    });

    return () => {};
}

const AnimatedCanvas: NextPage<{
    colors: ColorPalette;
}> = ({ colors }) => {
    const colorPaletteRef = useRef(new AnimatedColorPalette());
    const noise2DRef = useRef<Noise2D>(createNoise2D());
    const { colorMode } = useColorMode();

    useEffect(() => {
        const view = document.querySelector<HTMLCanvasElement>('.orbCanvas');

        if (!view) {
            return;
        }

        const pixiApp = new PIXI.Application({
            view,
            resizeTo: window,
            backgroundAlpha: 0,
        });
        const colorPalette = colorPaletteRef.current;
        const noise2D = noise2DRef.current;
        colorPalette.setColors(colors.hue, colorMode);
        colorPalette.setCustomProperties();
        pixiApp.stage.filters = [new KawaseBlurFilter(30, 10, true)];

        const generatedOrbs = Array.from({ length: 10 }, () => {
            const orb = new Orb(colorPalette.randomColor(), noise2D);
            pixiApp.stage.addChild(orb.graphics);
            return orb;
        });

        const stopAnimation = startOrbsAnimation(pixiApp, generatedOrbs);

        return () => {
            stopAnimation();
            generatedOrbs.forEach((orb) => orb.destroy());
            pixiApp.destroy(true, { children: true });
        };
    }, [colorMode, colors.hue]);

    return null;
};

export default AnimatedCanvas;
