/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AudioRepository } from './audio-repository';

@Injectable()
export class AudioService {
    audioRepository: AudioRepository;
    constructor(audio:AudioRepository) {
        this.audioRepository=audio;
    }
    play() {
        this.audioRepository.playMusic();
    }
}
