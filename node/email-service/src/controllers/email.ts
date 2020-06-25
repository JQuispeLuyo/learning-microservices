import { Controller, Get } from '@nestjs/common';
import { MailService } from 'src/services/mail.service';

@Controller("mail")
export class EmailController {

    constructor(
        private mailService: MailService
    ) { }

    @Get("/test")
    mailTransport() {
        
    }
}

