# FemboyVpn SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

FemboyVpnUtility.registrar = ->(u) {
  u.clean = FemboyVpnUtilities::Clean
  u.clean_add = FemboyVpnUtilities::CleanAdd
  u.clean_explain = FemboyVpnUtilities::CleanExplain
  u.done = FemboyVpnUtilities::Done
  u.make_error = FemboyVpnUtilities::MakeError
  u.feature_add = FemboyVpnUtilities::FeatureAdd
  u.feature_hook = FemboyVpnUtilities::FeatureHook
  u.feature_init = FemboyVpnUtilities::FeatureInit
  u.fetcher = FemboyVpnUtilities::Fetcher
  u.make_fetch_def = FemboyVpnUtilities::MakeFetchDef
  u.make_context = FemboyVpnUtilities::MakeContext
  u.make_options = FemboyVpnUtilities::MakeOptions
  u.make_request = FemboyVpnUtilities::MakeRequest
  u.make_response = FemboyVpnUtilities::MakeResponse
  u.make_result = FemboyVpnUtilities::MakeResult
  u.make_point = FemboyVpnUtilities::MakePoint
  u.make_spec = FemboyVpnUtilities::MakeSpec
  u.make_url = FemboyVpnUtilities::MakeUrl
  u.param = FemboyVpnUtilities::Param
  u.prepare_auth = FemboyVpnUtilities::PrepareAuth
  u.prepare_body = FemboyVpnUtilities::PrepareBody
  u.prepare_headers = FemboyVpnUtilities::PrepareHeaders
  u.prepare_method = FemboyVpnUtilities::PrepareMethod
  u.prepare_params = FemboyVpnUtilities::PrepareParams
  u.prepare_path = FemboyVpnUtilities::PreparePath
  u.prepare_query = FemboyVpnUtilities::PrepareQuery
  u.graphql_body = FemboyVpnUtilities::GraphqlBody
  u.graphql_errors = FemboyVpnUtilities::GraphqlErrors
  u.result_basic = FemboyVpnUtilities::ResultBasic
  u.result_body = FemboyVpnUtilities::ResultBody
  u.result_headers = FemboyVpnUtilities::ResultHeaders
  u.transform_request = FemboyVpnUtilities::TransformRequest
  u.transform_response = FemboyVpnUtilities::TransformResponse
}
