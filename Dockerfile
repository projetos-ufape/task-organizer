FROM swipl
WORKDIR /app
COPY script.pl /app/script.pl
CMD ["swipl", "-s", "script.pl"]