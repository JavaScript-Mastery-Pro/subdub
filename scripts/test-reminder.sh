#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-https://subdub-sigma.vercel.app}"
EMAIL="${EMAIL:-tidbitsjs@gmail.com}"
PASSWORD="${1:-${PASSWORD:-}}"
USER_AGENT="${USER_AGENT:-Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36}"
ARCJET_BYPASS_TOKEN="${ARCJET_BYPASS_TOKEN:-}"

COMMON_HEADERS=(
  -H "Content-Type: application/json"
  -H "Accept: application/json"
  -H "User-Agent: $USER_AGENT"
  -H "Origin: $BASE_URL"
  -H "Referer: $BASE_URL/"
)

if [ -n "$ARCJET_BYPASS_TOKEN" ]; then
  COMMON_HEADERS+=(-H "x-arcjet-bypass: $ARCJET_BYPASS_TOKEN")
fi

if [ -z "$PASSWORD" ]; then
  read -r -s -p "Password for ${EMAIL}: " PASSWORD
  echo
fi

echo "Using base URL: $BASE_URL"
echo "Using account: $EMAIL"

echo "Signing in..."
SIGNIN_RESPONSE=$(curl -sS -X POST "$BASE_URL/api/v1/auth/signin" \
  "${COMMON_HEADERS[@]}" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

TOKEN=$(printf '%s' "$SIGNIN_RESPONSE" | node -e 'let d="";process.stdin.on("data",c=>d+=c);process.stdin.on("end",()=>{try{const j=JSON.parse(d);process.stdout.write(j?.data?.token||"")}catch{process.stdout.write("")}})')

if [ -z "$TOKEN" ] || [ "$TOKEN" = "null" ]; then
  echo "Sign-in failed. Raw response:"
  echo "$SIGNIN_RESPONSE"
  exit 1
fi

START_DATE=$(node -e 'console.log(new Date(Date.now()-60*1000).toISOString())')
RENEWAL_DATE=$(node -e 'console.log(new Date(Date.now()+60*1000).toISOString())')
SUB_NAME="1-min reminder test $(date +%s)"

echo "Creating subscription with renewal in ~1 minute..."
CREATE_RESPONSE=$(curl -sS -X POST "$BASE_URL/api/v1/subscriptions" \
  "${COMMON_HEADERS[@]}" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"name\":\"$SUB_NAME\",\"price\":1,\"currency\":\"USD\",\"frequency\":\"monthly\",\"category\":\"Other\",\"startDate\":\"$START_DATE\",\"renewalDate\":\"$RENEWAL_DATE\",\"paymentMethod\":\"Test Card\"}")

WORKFLOW_RUN_ID=$(printf '%s' "$CREATE_RESPONSE" | node -e 'let d="";process.stdin.on("data",c=>d+=c);process.stdin.on("end",()=>{try{const j=JSON.parse(d);process.stdout.write(j?.data?.workflowRunId||"")}catch{process.stdout.write("")}})')
SUB_ID=$(printf '%s' "$CREATE_RESPONSE" | node -e 'let d="";process.stdin.on("data",c=>d+=c);process.stdin.on("end",()=>{try{const j=JSON.parse(d);process.stdout.write(j?.data?.subscription?._id||"")}catch{process.stdout.write("")}})')

if [ -z "$SUB_ID" ]; then
  echo "Subscription creation failed. Raw response:"
  echo "$CREATE_RESPONSE"
  exit 1
fi

echo "Subscription created: $SUB_ID"
if [ -n "$WORKFLOW_RUN_ID" ]; then
  echo "Workflow run id: $WORKFLOW_RUN_ID"
fi

echo "Check inbox for $EMAIL in about 1-2 minutes."
