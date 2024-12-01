import { Controller, Get } from '@nestjs/common';
import { 
  HealthCheck, 
  HealthCheckService, 
  HttpHealthIndicator,
  HealthCheckResult 
} from '@nestjs/terminus';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('health')
@ApiTags('Health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @ApiOperation({ 
    summary: 'Check server health',
    description: 'Returns the health status of the server and its dependencies'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Server is healthy',
    schema: {
      type: 'object',
      properties: {
        status: { 
          type: 'string', 
          example: 'ok',
          description: 'Overall health status'
        },
        info: {
          type: 'object',
          properties: {
            server: {
              type: 'object',
              properties: {
                status: { 
                  type: 'string', 
                  example: 'up',
                  description: 'Server status'
                }
              }
            }
          }
        }
      }
    }
  })
  @HealthCheck()
  @Get()
  check(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.http.pingCheck('server', 'http://localhost:3000'),
    ]);
  }
}
