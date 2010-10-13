require 'getoptlong'
require 'rubygems'
require 'pony'

# option definitions
args = GetoptLong.new(
  [ "--from",                 "-f",   GetoptLong::REQUIRED_ARGUMENT ],
  [ "--to",                   "-t",   GetoptLong::REQUIRED_ARGUMENT ],
  [ "--subject",              "-s",   GetoptLong::OPTIONAL_ARGUMENT ],
  [ "--body",                 "-b",   GetoptLong::OPTIONAL_ARGUMENT ],
  [ "--address",              "-a",   GetoptLong::REQUIRED_ARGUMENT ],
  [ "--port",                 "-p",   GetoptLong::REQUIRED_ARGUMENT ],
  [ "--enable_starttls_auto", "-e",   GetoptLong::REQUIRED_ARGUMENT ],
  [ "--user_name",            "-u",   GetoptLong::REQUIRED_ARGUMENT ],
  [ "--password",             "-w",   GetoptLong::REQUIRED_ARGUMENT ],
  [ "--authentication",       "-x",   GetoptLong::REQUIRED_ARGUMENT ],
  [ "--domain",               "-h",   GetoptLong::REQUIRED_ARGUMENT ]
)

opts = {}
args.each {|name, value| opts[name] = value}


Pony.mail(
  :to           => opts['--to'], 
  :from         => opts['--from'],
  :subject      => opts['--subject'],
  :body         => opts['--body'],
  :via          => :smtp, 
  :via_options  => {
    :address              => opts['--address'],
    :port                 => opts['--port'],
    :enable_starttls_auto => opts['--enable_starttls_auto'],
    :user_name            => opts['--user_name'],
    :password             => opts['--password'],
    :authentication       => opts['--authentication'],
    :domain               => opts['--domain']
  }
)