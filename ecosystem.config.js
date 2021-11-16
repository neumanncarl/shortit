module.exports = {
  apps : [{
    name: 'shortit-01',
    script: 'index.js',

    instances: 4,
    autorestart: true,
    watch: true,
	merge_logs: true,
    max_memory_restart: '4G',
	exec_mode: 'cluster',
    env: {
      PORT: '8080'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
  
  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
