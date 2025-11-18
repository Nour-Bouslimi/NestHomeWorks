/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { AudioService } from './audio.service';

@Controller('audio')
export class AudioController {
    audioService: AudioService;
    constructor(audio:AudioService) {
        this.audioService=audio;
    }
    play() {
        this.audioService.play();
    }
}
