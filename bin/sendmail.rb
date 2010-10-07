require 'getoptlong'
require 'rubygems'
require 'pony'

# option definitions
args = GetoptLong.new(
  [ "--from",         "-f",   GetoptLong::REQUIRED_ARGUMENT ],
  [ "--to",           "-t",   GetoptLong::REQUIRED_ARGUMENT ],
  [ "--subject",      "-s",   GetoptLong::OPTIONAL_ARGUMENT ],
  [ "--body",         "-b",   GetoptLong::OPTIONAL_ARGUMENT]
)

opts = {}
args.each {|name, value| opts[name] = value}

# # test
# opts = {
#   '--to' => 'abg237@nyu.edu',
#   '--from' => 'a@alexandergibbons.com',
#   '--subject' => 'test subject',
#   '--body' => 'test body'
# }
# eotest


Pony.mail(
  :to           => opts['--to'], 
  :from         => opts['--from'],
  :subject      => opts['--subject'],
  :body         => opts['--body'],
  :via          => :smtp, 
  :via_options  => {
    :address              => 'smtp.gmail.com',
    :port                 => '587',
    :enable_starttls_auto => true,
    :user_name            => 'a@alexandergibbons.com',
    :password             => 'algae1nr',
    :authentication       => :plain, # :plain, :login, :cram_md5, no auth by default
    :domain               => "tiburon@alexandergibbons.com" # the HELO domain provided by the client to the server
  }
)