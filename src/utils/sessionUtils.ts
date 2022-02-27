import { Request, Response } from 'express';
import { TConfigType } from '~/types/configType';

// session store
export const store = (sqlClient: any, config: TConfigType) => {
  const sqlSession = new sqlClient(
    {
      user: config.DB_USER,
      password: config.DB_PWD,
      server: config.DB_SERVER,
      database: config.DB_NAME,
      options: {
        encrypt: false,
        enableArithAbort: true,
        trustServerCertificate: false,
      },
    },
    {
      table: config.SESSION_TABLE,
    },
  );

  sqlSession.on('connect', () => {
    console.log('session connected');
  });

  sqlSession.on('sessionError', (err: any, classMethod: any) => {
    console.log('session error', err);
  });

  return sqlSession;
};

// session config
export const sessionConfig = (sqlClient: any, config: TConfigType) => ({
  store: store(sqlClient, config),

  name: config.SESSION_NAME,

  secret: config.SESSION_SECRET,

  resave: false,

  // true 로 세팅해야 rolling 가 유효함
  saveUninitialized: true,

  // 세션 갱신을 위해 true set
  rolling: true,

  cookie: {
    httpOnly: true,

    domain: config.SESSION_DOMAIN,

    path: '/',

    // SSL 통신 채널 연결 시에만 쿠키를 전송하도록 설정
    secure: false,

    //  기본 24시간 (1000 * 60 * 60 * 24)=86400000
    maxAge: config.SESSION_EXPIRES,

    sameSite: false,
  },
});

/** destroy session */
export const sessionDestory = (req: Request, res: Response) => {
  req.session?.destroy((err) => {
    if (err) {
      throw err;
    }
  });

  res.clearCookie('ssid', { path: '/' });
};
